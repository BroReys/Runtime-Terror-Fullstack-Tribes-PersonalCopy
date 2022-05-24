import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor() { }

  async getBuildings() {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    let buildingUrl = environment.apiURL + 'kingdoms/' + kingdomId + '/buildings';

    return axios.get(buildingUrl);
  }

  async getKingdomDetails() {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    let kingdomUrl = environment.apiURL + 'kingdoms/' + kingdomId;

    return axios.get(kingdomUrl);
  }

  async addBuilding(type: any) {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    let buildingUrl = environment.apiURL + 'kingdoms/' + kingdomId + '/buildings';

    return axios.post(buildingUrl, type);
  }

  async getBuildingRules(position: number, level: number) {
    let rulesUrl = environment.apiURL + 'rules/building/' + position + '/' + level;

    return axios.get(rulesUrl);
  }

  async upgradeBuilding(buildingId: number) {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    let upgradeUrl = environment.apiURL + 'kingdoms/' + kingdomId + '/buildings/' + buildingId;

    return axios.put(upgradeUrl, {action: "upgrade"});
  }

  async downgradeBuilding(buildingId: number) {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    let upgradeUrl = environment.apiURL + 'kingdoms/' + kingdomId + '/buildings/' + buildingId;

    return axios.put(upgradeUrl, {action: "tear-down", "instant": false});
  }

  async downgradeInstantBuilding(buildingId: number) {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    let upgradeUrl = environment.apiURL + 'kingdoms/' + kingdomId + '/buildings/' + buildingId;

    return axios.put(upgradeUrl, {action: "tear-down", "instant": true});
  }


}
