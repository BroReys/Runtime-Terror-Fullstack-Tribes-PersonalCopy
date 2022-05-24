import {Injectable} from '@angular/core';
import axios from "axios";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  battle1 = '../../../assets/img/battle/battle1.png';
  battle2 = '../../../assets/img/battle/battle2.png';
  battle3 = '../../../assets/img/battle/battle3.png';
  battle4 = '../../../assets/img/battle/battle4.png';
  constructor() {
  }

  async getKingdoms() {
    let kingdomsUrl = environment.apiURL + 'kingdoms';
    return axios.get(kingdomsUrl);
  }

  async getTroops() {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    let troopsUrl = environment.apiURL + 'kingdoms/' + kingdomId + '/troops';

    return axios.get(troopsUrl);
  }

  async getLatestBattleReport(defendingKingdomId: number) {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    let reportUrl = environment.apiURL + 'kingdoms/' + kingdomId + '/reports';

    return axios.post(reportUrl, {
      "defendingKingdom": defendingKingdomId
    });
  };

  firstLetterCapital(text: string) {
    return text.charAt(0).toUpperCase() + text.substring(1);
  }

  async startBattle(troops: any[], defendingKingdomId: number, ruler: any) {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    let battleUrl = environment.apiURL + 'kingdoms/' + kingdomId +  '/battles'
    return axios.post(battleUrl, {
      target: {
        kingdomId: defendingKingdomId,
        ruler: ruler
      },
      troops: troops
    });
  }

  async getActiveBattles() {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    let activeBattlesUrl = environment.apiURL + 'kingdoms/' + kingdomId + '/active-battles';
    return axios.get(activeBattlesUrl);
  }

  timeStampToDate(timeStamp: number) {
    let milliseconds = timeStamp * 1000;
    let date = new Date(milliseconds);
    let minutes = (date.getMinutes() <10 ? '0' : '')  + date.getMinutes();
    return date.toDateString() + ' ' + date.getHours() + ':'
      + minutes;
  }

  async getAllBattles() {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    let battlesUrl = environment.apiURL + 'kingdoms/' + kingdomId + '/battles';
    return axios.get(battlesUrl);
  }

  async getBattleDetail(battleId: number) {
    let kingdomId = window.sessionStorage.getItem('activeKingdomId');
    let battleDetailUrl = environment.apiURL + 'kingdoms/' + kingdomId + '/battles/' + battleId;
    return axios.get(battleDetailUrl);
  }

  getBattleImage(battleId: number) {
    if (battleId % 2 === 0) {
      return this.battle1;
    } else if (battleId % 3 === 0) {
      return this.battle2;
    } else if (battleId % 5 === 0) {
      return this.battle3;
    } else {
      return this.battle4;
    }
  }

  formatNumber(n: number) {
    if (n < 0) { throw 'must be non-negative: ' + n; }
    if (n === 0) { return '0'; }

    let output = [];

    for (; n >= 1000; n = Math.floor(n/1000)) {
      output.unshift(String(n % 1000).padStart(3, '0'));
    }
    output.unshift(n);

    return output.join(' ');
  }

  getTroopsToRequest() {
    const troops = [
      {
        type: "phalanx",
        quantity: 0
      },
      {
        type: "diplomat",
        quantity: 0
      },
      {
        type: "swordsman",
        quantity: 0
      },
      {
        type: "cavalry",
        quantity: 0
      },
      {
        type: "scout",
        quantity: 0
      },
      {
        type: "catapult",
        quantity: 0
      },
      {
        type: "settlers",
        quantity: 0
      }
    ]
    return troops;
  }

}
