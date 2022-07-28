import { Injectable,Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ResultManagementService } from './result-management.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInteceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('ininterceptor');
    let resultManagementService=this.injector.get(ResultManagementService);
      let tokenizedReq=req.clone({
        setHeaders:{
          Authorization:`Bearer ${resultManagementService.getToken()}`
        }
      })
      return next.handle(tokenizedReq);
  }
}
