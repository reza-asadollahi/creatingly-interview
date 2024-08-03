import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { UserService } from "../../auth/services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  logoSrc: string = "/assets/images/logo.png";
  userInfo: Observable<UserModel | null>;

  constructor(private userService: UserService) {
    this.userInfo = this.userService.userInfo$
  }

  logout() {
    this.userService.logout()
  }
}
