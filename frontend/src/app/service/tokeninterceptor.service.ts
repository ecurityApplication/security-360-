import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor{
  constructor(){}
   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //  console.log('Interceptor is being executed.');
    const jwtToken = localStorage.getItem('token');
    // console.log('Retrieved JWT token:', jwtToken);
    if (jwtToken != null) {
      // console.log('JWT token exists. Attaching to request headers.'); // Log that the JWT token exists
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
    // } else {
    //   console.log('No JWT token found.'); // Log if no JWT token is found
    }
    // console.log('Request sent to server');
     return next.handle(request);
   
  }
}





