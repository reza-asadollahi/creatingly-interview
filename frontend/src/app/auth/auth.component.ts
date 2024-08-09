import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "./services/user.service";
import { Router } from "@angular/router";
import { AuthTokenService } from "./services/auth-token.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  formGroup: FormGroup;
  isLoginMode: boolean = true;
  colorOptions: string[] = ["purple", "blue", "cyan", "indigo", "orange", "yellow", "red", "pink", "green", "lemon", "brown", "gray"];
  logoSrc: string = "/assets/images/logo-fullsize.png";


  constructor(private userService: UserService,
              private tokenService: AuthTokenService,
              private router: Router) {
    this.formGroup = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)]}),
      color: new FormControl(null)
    })
  }

  ngOnInit(): void {
    if(this.tokenService.token) {
      this.userService.userInfo$?.subscribe(user => {
        if (user) {
          this.router.navigate(['projects']);
        }
      })
    }
  }

  onSubmit() {
    const user: UserModel = this.formGroup.getRawValue()
    this.userService.signIn(user).subscribe(res => {
      this.router.navigate(['projects'])
    })
  }

  toggleLoginMode() {
    this.isLoginMode = !this.isLoginMode
  }
}
