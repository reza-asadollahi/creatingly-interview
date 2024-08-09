import { inject, Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AuthTokenService } from "./auth-token.service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserService {
  private http: HttpClient = inject(HttpClient)
  private readonly API_URL = `${environment.BASE_URL_API}/users`
  private _userInfo$: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);

  constructor(private router: Router,
              private tokenService: AuthTokenService) {
    if (this.tokenService.token) {
      this.fetchUserInfo(this.tokenService.token)
    }
  }

  get userInfo$() {
    return this._userInfo$?.asObservable()
  }

  signIn(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.API_URL}/sign-in`, user).pipe(tap(res => {
      this.tokenService.token = res.id;
      this._userInfo$.next(res)
    }))
  }

  fetchUserInfo(userId: string) {
    this.http.get<UserModel>(`${this.API_URL}/${userId}`).subscribe({
      next: res => {
        this._userInfo$.next(res)
      },
      error: err => {
        console.warn(err)
        this.logout()
      }
    })
  }

  logout() {
    this.tokenService.token = null
    this._userInfo$.next(null)
    this.router.navigate(['auth'])
  }
}
