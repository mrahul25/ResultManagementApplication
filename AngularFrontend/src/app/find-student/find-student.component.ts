import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ResultManagementService } from '../services/result-management.service';

@Component({
  selector: 'app-find-student',
  templateUrl: './find-student.component.html',
  styleUrls: ['./find-student.component.css']
})
export class FindStudentComponent implements OnInit {

  findStudent:any;

  constructor(private resultManagementService:ResultManagementService,private router:Router) { }
  alertError:boolean=false;
  errorMsg:string='';

  ngOnInit(): void {
    this.resetData();
  }
  FindStudent(){
    this.resultManagementService.findStudent(this.findStudent.value).subscribe((result:any)=>{
      console.log(result);
      this.router.navigate(['/details',result.id]);
    },
    (error)=>{
      this.errorMsg=error;
      this.alertError=true;
    })
  }
  closeAlertError(){
    this.alertError=false;
  }
  resetForm(){
    this.resetData();
    this.closeAlertError();
  }

  resetData(){
    this.findStudent=new FormGroup({
      rollNo:new FormControl('',[Validators.required,
        Validators.pattern("^[0-9]*$")]),
      dob:new FormControl('',Validators.required)
    });
  }

  get rollNo():any{return this.findStudent.get('rollNo')};
  get dob():any{return this.findStudent.get('dob')};
}
