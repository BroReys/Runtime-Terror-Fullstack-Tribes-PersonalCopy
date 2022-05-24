import {Component, Input, OnInit} from '@angular/core';
import {BattleService} from "../../../services/battle.service";

@Component({
  selector: 'app-defender-unfinished',
  templateUrl: './defender-unfinished.component.html',
  styleUrls: ['./defender-unfinished.component.scss']
})
export class DefenderUnfinishedComponent implements OnInit {
  @Input() battleDetails: any;
  constructor(private battleService: BattleService) { }

  ngOnInit(): void {
  }

  getBattleImage(battleId: number) {
    return this.battleService.getBattleImage(battleId);
  }

  timeStampToDate(timeStamp: number) {
    return this.battleService.timeStampToDate(timeStamp);
  }

}
