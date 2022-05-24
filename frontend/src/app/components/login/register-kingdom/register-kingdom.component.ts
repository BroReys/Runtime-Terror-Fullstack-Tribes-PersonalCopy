import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-register-kingdom',
  templateUrl: './register-kingdom.component.html',
  styleUrls: ['./register-kingdom.component.scss']
})
export class RegisterKingdomComponent implements OnInit {

  @Input() inputUsername:string="";
  @Input() inputPassword:string="";

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    if(this.userService.kingdoms.length==0){
      this.userService.getKingdoms();
    }
  }

  registerKingdom(
    username: string,
    password: string,
    name: string,
    coorx: string,
    coory: string
  ) {
    this.userService.registerKingdom(username, password, name, Number(coorx), Number(coory));
  }

}
