import { Injectable } from '@angular/core';
import axios from "axios";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class KingdomService {

  constructor() {}

  async getKingdoms() {
    return axios.get(environment.apiURL + 'getKingdoms');
  }

  async getKingdomDetails(kingdomId: number) {
    let kingdomUrl = environment.apiURL + 'kingdoms/' + kingdomId;
    return axios.get<any>(kingdomUrl);
  }
}
