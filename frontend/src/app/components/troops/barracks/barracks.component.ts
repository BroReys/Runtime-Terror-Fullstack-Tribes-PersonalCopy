import { Component, OnInit } from '@angular/core';
import {TroopsService} from "../../../services/troops-service/troops.service";

@Component({
  selector: 'app-barracks',
  templateUrl: './barracks.component.html',
  styleUrls: ['./barracks.component.scss']
})
export class BarracksComponent implements OnInit {
  troopsService: TroopsService;

  constructor(troopsService: TroopsService) {
    this.troopsService =troopsService;
  }

  ngOnInit(): void {
  }

}
