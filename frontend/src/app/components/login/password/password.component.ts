import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  token:string = "";

  constructor(
    public userService: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || "";
  }

  reset(email: string) {
    this.userService.passwordResetRequest(email);
  }

  newPassword(pwd1:string,pwd2:string){
    this.userService.newPassword(this.token, pwd1, pwd2);
  }

}
