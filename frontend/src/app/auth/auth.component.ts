import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "./services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  formGroup: FormGroup;
  isLoginMode: boolean = true;
  colorOptions: string[] = ["purple", "blue", "cyan", "indigo", "orange", "yellow", "red", "pink", "green", "lemon", "brown", "gray"];
  logoSrc: string = "/assets/images/logo-fullsize.png";


  constructor(private userService: UserService,
              private router: Router) {
    this.formGroup = new FormGroup({
      name: new FormControl(null , {validators: [Validators.required]}),
      color: new FormControl(null)
    })
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
