import {Component, Input, OnInit} from '@angular/core';
import {BattleService} from "../../../services/battle.service";

@Component({
  selector: 'app-defender-finished',
  templateUrl: './defender-finished.component.html',
  styleUrls: ['./defender-finished.component.scss']
})
export class DefenderFinishedComponent implements OnInit {
  @Input() battleDetails: any;

  constructor(private battleService: BattleService) { }

  ngOnInit(): void {
  }

  getBattleImage(battleId: number) {
    return this.battleService.getBattleImage(battleId);
  }

  formatNumber(n: number) {
    return this.battleService.formatNumber(n);
  }

  firstLetterCapital(text: string) {
    return this.battleService.firstLetterCapital(text);
  }
}
