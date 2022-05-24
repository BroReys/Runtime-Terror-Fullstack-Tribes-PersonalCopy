import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {environment} from "../../../environments/environment";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-identify',
  templateUrl: './identify.component.html',
  styleUrls: ['./identify.component.scss']
})
export class IdentifyComponent implements OnInit {

  content_db:string = "";

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    axios.get(environment.apiURL+"identify").then(result => this.content_db = JSON.stringify(result.data));
  }

}
