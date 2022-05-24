import { Injectable } from '@angular/core';
import axios from "axios";
import {environment} from "../../../environments/environment";
import {UserService} from "../user.service";

@Injectable({
  providedIn: 'root'
})
export class TroopsService {
  chosenTab = 'trainTroops';
  chosenTroop:any;
  chosenQuantity = 1;
  chosenQuantityRemove = 0;
  troopToUpgrade:any;
  userService: UserService;


  constructor(userService: UserService) {
    this.userService = userService
  }

  async fetchTroopTypes() {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    // let kingdomId = await this.userService.user['kingdom']['id']; // TODO not sure why when i come straight to barracks it fails -> if the component was at least once loaded it works
    // console.log(kingdomId)
    return axios.get(environment.apiURL + 'mapped-troop-rules/' + kingdomId);
  }

  async buyTroop(troopData:any) {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    return axios.post(environment.apiURL + 'kingdoms/' + kingdomId + '/troops', {type: troopData.typeTroop,quantity: troopData.wantBuy})
  }

  async upgradeTroop(troop:any) {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    console.log(troop);
    return axios.put(environment.apiURL + 'kingdoms/' + kingdomId + '/troops', {type: troop})
  }

  async showTroopsInBarracksByType() {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    return axios.get(environment.apiURL + 'kingdoms/' + kingdomId + '/troops/' + this.chosenTroop.name);
  }

  async removeTroop(quantity:any) {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    return axios.post(environment.apiURL + 'kingdoms/' + kingdomId + '/troops/' + this.chosenTroop.name + '/remove', {quantity: quantity});
  }
  async getTroopUnitLevel() {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    return axios.get(environment.apiURL + 'unit-level/' + kingdomId + '/' + this.chosenTroop.name);
  }
}
