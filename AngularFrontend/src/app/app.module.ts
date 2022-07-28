import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StudentsListComponent } from './students-list/students-list.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { LoginTeacherComponent } from './login-teacher/login-teacher.component';
import { HomeComponent } from './home/home.component';
import { FindStudentComponent } from './find-student/find-student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { TokenInteceptorService } from './services/token-inteceptor.service';
import { ResultManagementService } from './services/result-management.service';
import {MaterialModule} from './material/material.module';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    StudentsListComponent,
    UpdateStudentComponent,
    RegisterTeacherComponent,
    LoginTeacherComponent,
    HomeComponent,
    FindStudentComponent,
    StudentDetailsComponent,
    MatConfirmDialogComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [AuthGuard,ResultManagementService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInteceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[MatConfirmDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
