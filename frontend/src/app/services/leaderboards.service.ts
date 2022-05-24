import { Injectable } from '@angular/core';
import axios from "axios";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LeaderboardsService {



  chosenTab = 'leaderBoardsKingdom';

  constructor() { }

  async showLeaderBoardsByKingdom() {
    return axios.get(environment.apiURL + 'leaderboards/kingdoms');
  }

  async showLeaderBoardsByRuler() {
    return axios.get(environment.apiURL + 'leaderboards/rulers');
  }
}
