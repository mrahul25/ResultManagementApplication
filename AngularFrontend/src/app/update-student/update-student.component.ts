import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { ResultManagementService } from '../services/result-management.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  panelTitle:string='';
  panelSubmit:string='';
  successStatus :string='';

  updateStudent:any;

  constructor(private resultManagementService:ResultManagementService,
    private router:ActivatedRoute ,private route:Router) { }
    paramId=this.router.snapshot.paramMap.get('id');
    alert:boolean=false;
    alertError:boolean=false;
    errorMsg:string='';
    hasError:boolean=false;

  ngOnInit(): void {
    this.resetData();
    //console.warn(this.router.snapshot.paramMap.get('id'));
    if(!this.paramId){
      this.panelTitle='Create Student';
      this.panelSubmit='Create';
      this.successStatus='created';
    }
    else{
      this.panelTitle='Update Student';
      this.panelSubmit='Update';
      this.successStatus='updated';
      this.resultManagementService.getStudent(this.paramId).subscribe((result:any)=>{
        //console.log(result);
        this.updateStudent=new FormGroup({
          rollNo:new FormControl(result.rollNo,[Validators.required,
            Validators.pattern("^[0-9]*$")]),
          name:new FormControl(result.name,Validators.required),
          dob:new FormControl(result.dob,Validators.required),
          score:new FormControl(result.score,[Validators.required,
            Validators.pattern("^-?[0-9]*$"),Validators.min(0),Validators.max(100)])
        });
      },(error)=>{
        this.hasError=true;
        this.errorMsg=error.error.message;
      })

    }   
  }
  updatingStudent():void{
    if(!this.paramId){
      this.resultManagementService.addStudent(this.updateStudent.value).subscribe((result)=>{
        console.log(result);
        this.alertError=false;
        this.alert=true;
      },
      (error)=>{
        if(error.status==401){
          this.route.navigate(['/login']);
          this.resultManagementService.removeToken();
          
        }
        this.errorMsg=error.error.message;
        this.alertError=true;
      })
    }
    else{
      this.resultManagementService.updateStudent(this.paramId,this.updateStudent.value).subscribe
    ((result)=>{
      console.log(result);
      this.alertError=false;
      this.alert=true;
    } ,(error)=>{
      if(error.status==401){
        this.route.navigate(['/login']);
        this.resultManagementService.removeToken();
        
      }
      this.errorMsg=error.error.message;
      this.alertError=true;
    })
    }
    
  }
  closeAlert(){
    this.alert=false;
  }
  closeAlertError(){
    this.alertError=false;
  }
  resetForm(){
    this.resetData();
    this.closeAlert();
    this.closeAlertError();
  }
  resetData(){
    this.updateStudent=new FormGroup({
      rollNo:new FormControl('',[Validators.required,
        Validators.pattern("^[0-9]*$")]),
      name:new FormControl('',Validators.required),
      dob:new FormControl('',Validators.required),
      score:new FormControl('',[Validators.required,
        Validators.pattern("^-?[0-9]*$"),Validators.min(0),Validators.max(100)])
    })
  }
  get rollNo():any{return this.updateStudent.get('rollNo')};
  get name():any{return this.updateStudent.get('name')};
  get dob():any{return this.updateStudent.get('dob')};
  get score():any{return this.updateStudent.get('score')};
}
