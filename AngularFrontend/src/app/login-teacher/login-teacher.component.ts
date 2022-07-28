import { Component, OnInit } from '@angular/core';
import { ResultManagementService } from '../services/result-management.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-teacher',
  templateUrl: './login-teacher.component.html',
  styleUrls: ['./login-teacher.component.css']
})
export class LoginTeacherComponent implements OnInit {

  alertError:boolean=false;
  errorMsg:string='';
  returnUrl:any;
  constructor(private resultManagementService:ResultManagementService,
    private router:Router,private activatedRoute:ActivatedRoute) { }

  loginTeacher:any=new FormGroup({
    name:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })
  ngOnInit(): void {
    if(this.resultManagementService.isLoggedIn()){
      this.router.navigate(['/list']);
    }
    this.activatedRoute.queryParams.subscribe((params)=>[
       this.returnUrl= params['returnUrl']
    ])
  }
  login(){
    this.resultManagementService.loginTeacher(this.loginTeacher.value).subscribe((result:any)=>{
      console.log(result);
      localStorage.setItem('token',result.token);
     console.log(this.returnUrl+"--url--");
      if(this.returnUrl==null){
        this.router.navigate(['/list']);
      }
      else{
        this.router.navigate([this.returnUrl]);
      }
    },
    (error)=>{
      this.errorMsg=error;
      this.alertError=true;
    })
  }
  get name(){return this.loginTeacher.get('name')};
  get password(){return this.loginTeacher.get('password')};
  closeAlertError(){
    this.alertError=false;
  }
  
}
