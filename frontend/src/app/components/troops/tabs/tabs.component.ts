import { Component, OnInit } from '@angular/core';
import {TroopsService} from "../../../services/troops-service/troops.service";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  toggle = true;
  status = 'Enable';
  text = '';
  troopsService: TroopsService;

  constructor(troopsService: TroopsService) {
    this.troopsService =troopsService;
  }

  ngOnInit(): void {
  }

  onClick(trainTroops: string) {
    console.log(trainTroops)
    this.troopsService.chosenTab = trainTroops;
    this.troopsService.chosenTroop = null;
  }

}
