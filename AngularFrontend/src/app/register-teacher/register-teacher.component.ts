import { Component, OnInit } from '@angular/core';
import { ResultManagementService } from '../services/result-management.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css']
})
export class RegisterTeacherComponent implements OnInit {

  constructor(private resultManagementService:ResultManagementService) { }
  alert:boolean=false;
  alertError:boolean=false;
  errorMsg:string='';

  registerTeacher:any=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(4)]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])
  })
  ngOnInit(): void {
  }
  register():void{
    this.resultManagementService.registerTeacher(this.registerTeacher.value).subscribe((result)=>{
      console.log(result);
      this.alertError=false;
      this.alert=true;
    },
    (error)=>{
      this.errorMsg=error;
      this.alertError=true;
    }
    )
  }
  closeAlert(){
    this.alert=false;
  }
  closeAlertError(){
    this.alertError=false;
  }
  get name(){return this.registerTeacher.get('name')};
  get password(){return this.registerTeacher.get('password')};
}
