const jwt = require("jsonwebtoken");


// const requiredAuth=(req,res,next)=>{
//     console.log('in middleware')
//     const token=req.cookies.jwt;
//     if(token){
//         jwt.verify(token,'nagarro',(error,decodedToken)=>{
//             if(error){
                
//                 res.redirect('/teacher/login'); 
//             }
//             else{
//                 console.log(decodedToken);
                
//                 next();
//             }
//         })
//     }
//     else{
        
//         res.redirect('/teacher/login');
//     }
// }

const verifyToken=(req,res,next)=>{
    console.log(req.headers.authorization+" check");
    if(!req.headers.authorization){
        
        return res.status(401).send({message:'unauthorized request'});
    }
    let token=req.headers.authorization.split(' ')[1];
    console.log(token+" token");
    if(token=='null'){
        
        return res.status(401).send({message:'unauthorized request'});
    }
    let payload;
    try{
        payload=jwt.verify(token,'nagarro');
    }
    catch(ex){
        
        return res.status(401).send({message:'unauthorized request'}); 
    }
    
    if(!payload){
        
        return res.status(401).send({message:'unauthorized request'}); 
    }
    next();
}
module.exports = { verifyToken };