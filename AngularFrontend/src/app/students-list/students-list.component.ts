import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResultManagementService } from '../services/result-management.service';
import { Router} from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  
  constructor(private resultManagementService:ResultManagementService,private router:Router
    ,private dialogService:DialogService,private toastr: ToastrService) { }
  students:any=[];
 
  page:number=1;
  hasError:boolean=false;
  errorMsg:string='';
  ngOnInit(): void {

    this.refreshStudentsList();
  }
  deleteStudent(id:any){
    // if(confirm('Are u sure to delete the record?')==true){
    //   this.resultManagementService.deleteStudent(id).subscribe((result)=>{     
    //     console.log(result);
    //     this.refreshStudentsList();
    //   })
    // }   
    this.dialogService.openConfirmDialog().afterClosed().subscribe((res)=>{
      if(res){
        this.resultManagementService.deleteStudent(id).subscribe((result)=>{     
              console.log(result);
              this.toastr.success('Student record successfully deleted');
              this.refreshStudentsList();
            })
      }
    })
  }

  refreshStudentsList(){
    this.resultManagementService.getStudents().subscribe((result)=>{
      console.log(result);
      this.students=result;
      //this.totalStudents=this.students.length;
      //this.studentsData=new MatTableDataSource(this.students);
    },
    (error)=>{
      
        
        if(error.status==401){
          this.router.navigate(['/login']);
          this.resultManagementService.removeToken();
          console.log("second block")
        }
        this.hasError=true;
        this.errorMsg=error.error.message;

    })
  }
}
