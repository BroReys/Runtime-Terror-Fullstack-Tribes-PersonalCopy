import { Component, OnInit } from '@angular/core';
import {TroopsService} from "../../../services/troops-service/troops.service";

@Component({
  selector: 'app-troop-list',
  templateUrl: './troop-list.component.html',
  styleUrls: ['./troop-list.component.scss']
})
export class TroopListComponent implements OnInit {
  troopsService: TroopsService;
  troopTypes:any = [];
  loadingData: boolean = true;

  constructor(troopsService: TroopsService) {
    this.troopsService =troopsService;
  }

  ngOnInit(): void {
    this.getTroopTypes()
    console.log("bleeeeee")
  }

  getTroopTypes() {
    this.troopsService
    .fetchTroopTypes()
    .then((res:any) => {
      this.troopTypes = res.data;
      this.setLoadingData();
    })
    .catch((err:any) => {
      console.log(err);
    })
  }

  setLoadingData() {
    this.loadingData = false;
  }

}
