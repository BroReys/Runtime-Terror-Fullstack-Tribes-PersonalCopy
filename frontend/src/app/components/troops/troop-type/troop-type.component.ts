import {Component, Input, OnInit} from '@angular/core';
import {TroopsService} from "../../../services/troops-service/troops.service";

@Component({
  selector: 'app-troop-type',
  templateUrl: './troop-type.component.html',
  styleUrls: ['./troop-type.component.scss']
})
export class TroopTypeComponent implements OnInit {
  @Input() troop_type:any;
  troopsService: TroopsService;

  constructor(troopsService: TroopsService) {
    this.troopsService =troopsService;
  }

  ngOnInit(): void {
  }

  onClick(troop_type: any) {
    this.troopsService.chosenTroop = troop_type;
    this.troopsService.chosenTab = 'none';
  }
}
