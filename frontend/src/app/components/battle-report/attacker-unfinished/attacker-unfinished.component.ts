import {Component, Input, OnInit} from '@angular/core';
import {BattleService} from "../../../services/battle.service";

@Component({
  selector: 'app-attacker-unfinished',
  templateUrl: './attacker-unfinished.component.html',
  styleUrls: ['./attacker-unfinished.component.scss']
})
export class AttackerUnfinishedComponent implements OnInit {
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

  formatNumber(n: number) {
    return this.battleService.formatNumber(n);
  }

  firstLetterCapital(text: string) {
    return this.battleService.firstLetterCapital(text);
  }
}
