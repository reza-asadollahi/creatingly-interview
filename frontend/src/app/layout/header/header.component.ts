import { Component } from '@angular/core';
import { Observable } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  logoSrc: string = "/assets/images/logo.png";
  userInfo!: Observable<UserModel>;

  constructor() {
  }

}
