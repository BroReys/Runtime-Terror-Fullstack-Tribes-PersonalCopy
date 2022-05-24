import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import axios from "axios";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tribes-frontend';

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userService.useLocalToken();

    axios.interceptors.response.use(
      res => res,
      err => {
        // Any HTTP Code which is not 2xx will be considered as error
        const statusCode = err.response.status;
        if (statusCode === 401) {
          this.userService.logout();
          this.router.navigate(['/login']);
        } else if (statusCode === 404) {
          this.router.navigate(['/404']);
        }
        throw err;
      }
    );

  }

}
