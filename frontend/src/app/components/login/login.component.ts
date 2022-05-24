import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;
  token: string = "";

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    if(!this.userService.user){
      this.isLoggedIn = false;
    }
  }

  login(username: string, password: string) {
    this.userService.login(username, password)
  }

  logout(){
    this.userService.logout();
    this.isLoggedIn = false;
  }

}
