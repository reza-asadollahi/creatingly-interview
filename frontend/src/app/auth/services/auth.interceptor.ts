import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthTokenService } from "./auth-token.service";
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private tokenService: AuthTokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url.includes('/users')) {
      // request without token
      return next.handle(request)
    }

    let finalRequest = request;
    const token = this.tokenService.token;
    if (token != null) {
      finalRequest = request.clone({ headers: request.headers.set("userId", token) });
    }

    return next.handle(finalRequest).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.router.navigate(['auth']);
      }

      return throwError(error);
    }));
  }
}
