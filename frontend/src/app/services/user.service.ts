import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

import axios from "axios";
import {BehaviorSubject, Observable} from "rxjs";
import {KingdomDataService} from "./kingdom-data.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userBS: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  user: any = null;
  loginError: string = "";
  passwordError: string = "";
  passwordSuccess: string = "";
  registerError: string = "";
  registerSuccess: string = "";
  activationSuccess: string = "";
  activationError: string = "";
  kingdomRegisterError: string = "";
  kingdomRegisterSuccess: string = "";
  kingdomCoorX: number = 0;
  kingdomCoorY: number = 0;

  noKingdomRegistered: boolean = false;

  kingdoms: any[] = [];

  constructor(private router: Router, private kingdomDataService: KingdomDataService) {
  }

  login(username: string, password: string) {
    axios.post(environment.apiURL + "login", {username: username, password: password})
    .then(response => {
      this.useToken(response.data.token);
      this.identifyUser();
      this.router.navigate(['/kingdoms']);
    })
    .catch(error => {
      this.loginError = error.response.data['error'];
      if (error.response.status == 412) {
        this.noKingdomRegistered = true;
        console.log(this.noKingdomRegistered);
      }
    })
    ;
  }

  logout() {
    localStorage.removeItem('token');
    this.removeTokenFromHeaders();
    window.sessionStorage.removeItem(('activeKingdomId'));
    this.user = null;
    this.noKingdomRegistered = false;
    this.router.navigate(['/login']);
  }

  getToken() {
    let token = localStorage.getItem('token');
    return token || "";
  }

  useToken(token: string) {
    this.addTokenToHeaders(token);
    localStorage.setItem('token', token);
  }

  useLocalToken() {
    let localToken = localStorage.getItem('token');
    if (localToken) {
      this.addTokenToHeaders(localToken);
      this.identifyUser();
    }
  }

  addTokenToHeaders(token: string) {

    axios.defaults.headers.common['Authorization'] = "Bearer " + token;

  }

  removeTokenFromHeaders() {

    axios.defaults.headers.common['Authorization'] = "";

  }

  identifyUser() {
    axios.get(environment.apiURL + "identify")
    .then(result => {
      this.user = result.data;
      this.userBS.next(result.data);
      this.kingdomDataService.changeData(+result.data.kingdom[0]['id']);
      window.sessionStorage.setItem('activeKingdomId', result.data.kingdom[0]['id']);
    })
  }

  passwordResetRequest(email: string) {
    axios.post(environment.apiURL + "forgotten-password", {email: email})
    .then(response => {
      this.passwordSuccess = response.data.success;
    })
    .catch(error => {
      this.passwordError = error.response.data['error']
    });
  }

  newPassword(token: string, pwd1: string, pwd2: string) {
    axios.put(environment.apiURL + "forgotten-password/reset?token=" + token,
      {firstPsw: pwd1, secondPsw: pwd2})
    .then(response => {
      this.passwordSuccess = response.data.success;
    })
    .catch(error => {
      this.passwordError = error.response.data['error'];
    });
  }

  registerUser(username: string, email: string, password: string) {
    axios.post(environment.apiURL + "registration",
      {username: username, email: email, password: password})
    .then(response => {
      this.registerSuccess = response.data.message;
    })
    .catch(error => {
      this.registerError = error.response.data['error'];
    });
  }

  activateUser(token: string) {
    axios.get(environment.apiURL + "registration/confirmation?activation=" + token)
    .then(response => {
      this.activationSuccess = response.data.success;
      //this.getKingdoms();
    })
    .catch(error => {
      this.activationError = error.response.data['error'];
    });
  }

  registerKingdom(
    username: string,
    password: string,
    name: string,
    coorx: number,
    coory: number
  ) {
    axios.post(environment.apiURL + "register/kingdom",
      {
        username: username,
        "password": password,
        "kingdomName": name,
        "coordinateX": coorx,
        "coordinateY": coory
      })
    .then(response => {
      this.kingdomRegisterSuccess = response.data;
      if (!this.user) {
        this.login(username, password);
      }
    })
    .catch(error => {
      this.kingdomRegisterError = error.response.data['error'];
    });
  }

  getKingdoms() {
    axios.get(environment.apiURL + 'kingdoms').then(res => {
      this.kingdoms = res.data
    });
  }

  setCoors(x: number, y: number) {
    this.kingdomCoorX = x;
    this.kingdomCoorY = y;
  }

}
