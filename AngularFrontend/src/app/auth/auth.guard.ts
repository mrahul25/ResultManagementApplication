import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { ResultManagementService } from '../services/result-management.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private resultManagementService:ResultManagementService){

  }
  canActivate(activatedRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
   if(this.resultManagementService.isLoggedIn()){
     return true;
     
   }
   else{ 
     localStorage.removeItem('token');  
      this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});         
     return false;
   }
  }
  
}
