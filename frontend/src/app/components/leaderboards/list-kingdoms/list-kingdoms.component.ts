import { Component, OnInit } from '@angular/core';
import {LeaderboardsService} from "../../../services/leaderboards.service";

@Component({
  selector: 'app-list-kingdoms',
  templateUrl: './list-kingdoms.component.html',
  styleUrls: ['./list-kingdoms.component.scss']
})
export class ListKingdomsComponent implements OnInit {

  leadersKingdom:any;
  leaderBoardsService: LeaderboardsService;

  updating:boolean = false;


  constructor(leaderBoardsService: LeaderboardsService) {
    this.leaderBoardsService = leaderBoardsService;
  }

  ngOnInit(): void {
    this.listKingdoms();
  }

  listKingdoms() {
    this.updating = true;
    this.leaderBoardsService.showLeaderBoardsByKingdom()
      .then((res:any) => {
        this.leadersKingdom = res.data;
        this.updating = false;
        console.log(res.data);
      }).catch((err:any) => {
        this.updating = false;
        console.log(err);
    })
  }

}
