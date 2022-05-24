import { Component, OnInit } from '@angular/core';
import {LeaderboardsService} from "../../../services/leaderboards.service";

@Component({
  selector: 'app-tabs-leaderboards',
  templateUrl: './tabs-leaderboards.component.html',
  styleUrls: ['./tabs-leaderboards.component.scss']
})
export class TabsLeaderboardsComponent implements OnInit {

  leaderBoardsService: LeaderboardsService;


  constructor(leaderBoardsService: LeaderboardsService) {
    this.leaderBoardsService = leaderBoardsService;
  }

  ngOnInit(): void {
  }

  onClick(leaderBoardsKingdom: string) {
    this.leaderBoardsService.chosenTab = leaderBoardsKingdom;
  }
}
