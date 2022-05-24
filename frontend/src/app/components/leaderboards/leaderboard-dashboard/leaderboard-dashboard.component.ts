import { Component, OnInit } from '@angular/core';
import {LeaderboardsService} from "../../../services/leaderboards.service";

@Component({
  selector: 'app-leaderboard-dashboard',
  templateUrl: './leaderboard-dashboard.component.html',
  styleUrls: ['./leaderboard-dashboard.component.scss']
})
export class LeaderboardDashboardComponent implements OnInit {

  leaderBoardsService: LeaderboardsService;


  constructor(leaderBoardsService: LeaderboardsService) {
    this.leaderBoardsService = leaderBoardsService;
  }

  ngOnInit(): void {
  }

}
