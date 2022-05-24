import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  token: string = "";
  userActivated: boolean = false;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || "";
    if(this.token){
      this.userService.activateUser(this.token);
    }
  }

  registerUser(username:string, email: string, password: string){
    this.userService.registerUser(username, email, password);
  }

}
