import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ResultManagementService } from '../services/result-management.service';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor(private router:ActivatedRoute,private resultManagementService:ResultManagementService,
    private route:Router) { }

  studentDetails:any;
  errorMsg:string='';
  hasError:boolean=false;

  ngOnInit(): void {
    let idParam=this.router.snapshot.paramMap.get('id');
    this.resultManagementService.getStudent(idParam).subscribe((result:any)=>{
      this.studentDetails={
        rollNo:result['rollNo'],
        name:result['name'],
        dob:result['dob'],
        score:result['score']
      }
    },
    (error)=>{
      console.log(error);   
      this.hasError=true;
      this.errorMsg=error.error.message;
      ;
    })

  }

}
