import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsListComponent } from './students-list/students-list.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { LoginTeacherComponent } from './login-teacher/login-teacher.component';
import { Routes , RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { FindStudentComponent } from './find-student/find-student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes:Routes=[
  {
    component:HomeComponent,
    path:''
  },
  {
    component:StudentsListComponent,
    path:'list',
    canActivate:[AuthGuard]
  },
  {
    component:UpdateStudentComponent,
    path:'create',
    canActivate:[AuthGuard]
  },
  {
    component:UpdateStudentComponent,
    path:'update/:id',
    canActivate:[AuthGuard]
  },
  {
    component:RegisterTeacherComponent,
    path:'register'
  },
  {
    component:LoginTeacherComponent,
    path:'login'
  },
  {
    component:FindStudentComponent,
    path:'find'
  },
  {
    component:StudentDetailsComponent,
    path:'details/:id',
    
  },
  {
    component:PageNotFoundComponent,
    path:'**'
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports :[RouterModule]
})
export class AppRoutingModule { }
