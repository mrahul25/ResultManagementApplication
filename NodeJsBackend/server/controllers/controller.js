const Student=require('../models/student');
const Teacher=require('../models/teacher');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;


const maxAge=1*24*60*60;

const createToken=(id)=>{
    return jwt.sign({id},'nagarro',{
        expiresIn:maxAge
    })
}


exports.create=async (req,res)=>{
    
    const{rollNo,name,dob,score}=req.body;
    if(rollNo==''||name==''||dob==''||score==''){
        res.status(400).send({message :'fields cannot be empty'});
    }
    const dobFormatted=new Date(dob);
    const newStudent=new Student({rollNo,name,dob:dobFormatted,score});
    const studentAlreadyExists=await Student.findOne({where:{rollNo}}).catch((err)=>{
        return res.status(500).send({message : err.message || 'error occured while creating student'})
       
    })
    if(studentAlreadyExists){
        
        return res.status(400).send({message:'Student with given rollno already registered'});
    }
    const student= await newStudent.save().catch((err)=>{
        return res.status(500).send({message : err.message || 'error occured while creating student'})
        
    });
    if(student){
        res.send(student);
        
    }
}

exports.findStudent=async(req,res)=>{
    console.log('in findStudent');
    const id=req.params.id;
    const student= await Student.findByPk(id).catch((err)=>{
       return res.status(500).send({ message : err.message || "Error Occurred while retrieving student" })
    })
    if(!student){
        return res.status(400).send({ message : "student is not found"});
    }
    else{
        let modifiedStudent={
            id:student.id,
            rollNo:student.rollNo,
            name:student.name,
            dob:JSON.stringify(student.dob).substring(1,11),
            score:student.score
        }
        res.json(modifiedStudent);
    }
}

exports.find = async (req,res)=>{
    
        const students=await Student.findAll().catch((err)=>{
           return res.status(500).send({ message : err.message || "Error Occurred while retriving students" })
        })
        console.log(students.length+" checking length");
        if(students){
            let modifiedStudents=[];
            students.forEach(element => {
                let modifiedStudent={
                    id:element.id,
                    rollNo:element.rollNo,
                    name:element.name,
                    dob:JSON.stringify(element.dob).substring(1,11),
                    score:element.score
                }
                modifiedStudents.push(modifiedStudent);
            });
            res.json(modifiedStudents);
        }
  
}

exports.update=async (req,res)=>{
    const{rollNo,name,dob,score}=req.body;
    if(rollNo==''||name==''||dob==''||score==''){
        return res.status(400).send({ message : "Data to update can not be empty"})
    }
    const id = req.params.id;
    console.log(id+" debug");
    const student= await Student.findByPk(id).catch((err)=>{
        return res.status(500).send({ message : err.message || "Error Occurred while updating student" })
    })
    if(!student){
        return res.status(400).send({ message : "student to be updated is not found"});
    }
    const prevRollNo=student.rollNo;
    if(prevRollNo!=rollNo){
        const studentWithRollNo=await Student.findOne({where:{rollNo}}).catch((err)=>{
            return res.status(500).send({message : err.message || 'error occured while updating student'})
           
        })
        if(studentWithRollNo){
        
            return res.status(400).send({message:'Student with given rollno already registered'});
        }
    } 
    const dobFormatted=new Date(dob);
    const updatedStudent= await student.update({rollNo,name,dob:dobFormatted,score}).catch((err)=>{
       return res.status(500).send({ message : err.message || "Error Occurred while updating student" });
    })
    if(updatedStudent){
        res.send(updatedStudent);
    }
}

exports.delete=async (req,res)=>{
    const id = req.params.id;
    console.log(id);
    await Student.destroy({where:{id}}).catch((err)=>{
       return res.status(500).send({ message : err.message || "Error Occurred while deleting student" });
    })
     res.json({ message : "student successfully deleted" });
}

exports.check=async (req,res)=>{
    const{rollNo,dob}=req.body;
    if(req.body.rollNo=='' || req.body.dob==''){
        return res.status(400).send({message :'fields cannot be empty'});
        
      }
    console.log(dob);
    const modifiedDob=new Date(dob);
    const student= await Student.findOne({where:{rollNo,dob:modifiedDob}}).catch((err)=>{
       return res.status(500).send({message : err.message || 'error occured while obtaining student'})
    })
    if(student){
        //console.log(student.dob);
        let modifiedStudent={
            id:student.id,
            rollNo:student.rollNo,
            name:student.name,
            dob:JSON.stringify(student.dob).substring(1,11),
            score:student.score
        }
        return res.send(modifiedStudent);
        
    }
    else{
        return res.status(400).send({message : 'please enter correct values'});
        
    }
}

exports.register=async(req,res)=>{

    const{name,password}=req.body;
    console.log(name);
    if(req.body.name=='' || req.body.password==''){
      return res.status(400).send({message :'fields cannot be empty'});
      
    }
    if(req.body.password.length<6){
        return res.status(400).send({message : 'password length should be greater than 5'});
        
      }
    
    const teacherAlreadyExists=await Teacher.findOne({where:{name}}).catch((err)=>{
        
        return res.status(500).send({message : err.message || 'error occured while creating teacher'})
    })
    if(teacherAlreadyExists){
       
        return res.status(400).send({message:'Teacher with given name already registered'});
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    const newTeacher=new Teacher({name,password:hash});
    const teacher= await newTeacher.save().catch((err)=>{
        
       return res.status(500).send({message : err.message || 'error occured while creating teacher'})
    });
    if(teacher){
        
        res.send({message:'Successfully registered'});
        
    }
}

exports.login_get=async(req,res)=>{
    console.log("in login get")
    const alreadyLoggedin=req.cookies.jwt;
    if(alreadyLoggedin){
        res.redirect('/teacher/students-info');
    }
    else{
        res.render('login');
    }
}

exports.login=async (req,res)=>{
    console.log('login start')
 
    const { name, password } = req.body;
    if(req.body.name=='' || req.body.password==''){
         return res.status(400).send({message :'fields cannot be empty'});
        
      }
    const teacherWithName = await Teacher.findOne({ where: { name } }).catch(
        (err) => {
            return res.status(500).send({message : err.message || 'error occured while login'});
        }
      );
    if (!teacherWithName)
    
   return res.status(400).send({ message: "Name or password does not match!" });

    if (!bcrypt.compareSync(password, teacherWithName.password))
    
    return res.status(400).json({ message: "Name  or password does not match!" });

    const token =createToken(teacherWithName.id);
    
    console.log("login post")
    res.send({token:token});
    
}



