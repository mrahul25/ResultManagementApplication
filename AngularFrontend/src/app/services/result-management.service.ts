import { Injectable } from '@angular/core';

import{ HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ResultManagementService {
  url='http://localhost:5000/api/students';
  url2='http://localhost:5000/api/find';
  url3='http://localhost:5000/api/register';
  url4='http://localhost:5000/api/login';


  constructor(private http:HttpClient,private router:Router) { }

  getStudents(){
    return this.http.get(this.url);
  }
  addStudent(data:any){
    return this.http.post(this.url,data);
  }
  deleteStudent(id:any){
    return this.http.delete(`${this.url}/${id}`);
  }
  getStudent(id:any){
    return this.http.get(`${this.url}/${id}`);
  }
  updateStudent(id:any,student:any){
    return this.http.put(`${this.url}/${id}`,student);
  }
  findStudent(student:any){
    return this.http.post(this.url2,student).pipe(catchError(this.errorHandler));
  }
  registerTeacher(teacher:any){
    return this.http.post(this.url3,teacher).pipe(catchError(this.errorHandler));
  }
  loginTeacher(teacher:any){
    return this.http.post(this.url4,teacher).pipe(catchError(this.errorHandler));
  }
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
   this.removeToken();
    this.router.navigate(['/']);
  }
  removeToken(){
    localStorage.removeItem('token');
  }
  errorHandler(error:HttpErrorResponse){
    return throwError(error.error.message||'server error');
    
  }
  
}
