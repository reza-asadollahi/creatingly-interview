import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

// Warning: do not make a request in this service because it used in Interceptor so it cause to circular dependency
@Injectable({providedIn: 'root'})
export class AuthTokenService {
  protected readonly _token$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem('token') || null);

  get token$() {
    return this._token$.asObservable()
  }

  get token() {
    let token = this._token$.value;
    return token
  }

  set token(token: string | null) {
    this._token$.next(token);
    if(token)
      localStorage.setItem('token', token)
    else
      localStorage.removeItem('token')
  }
}
