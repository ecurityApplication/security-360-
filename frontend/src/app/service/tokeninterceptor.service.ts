import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor{
  constructor(
    private storageService : StorageService 
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storageService.token;
    if (token) {
      console.log(token);
      
      const authReq = request.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}





