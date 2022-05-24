import { Component, OnInit } from '@angular/core';
import {LeaderboardsService} from "../../../services/leaderboards.service";

@Component({
  selector: 'app-list-rulers',
  templateUrl: './list-rulers.component.html',
  styleUrls: ['./list-rulers.component.scss']
})
export class ListRulersComponent implements OnInit {

  rulersKingdom:any;
  leaderBoardsService: LeaderboardsService;

  updating:boolean = false;


  constructor(leaderBoardsService: LeaderboardsService) {
    this.leaderBoardsService = leaderBoardsService;
  }

  ngOnInit(): void {
    this.listRulers();
  }

  listRulers() {
    this.updating = true;
    this.leaderBoardsService.showLeaderBoardsByRuler()
      .then((res:any) => {
        this.rulersKingdom = res.data;
        this.updating = false;
        console.log(res.data);
      }).catch((err:any) => {
      this.updating = false;
      console.log(err);
    })
  }

}
