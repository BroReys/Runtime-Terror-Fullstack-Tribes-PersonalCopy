import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-choose-troops',
  templateUrl: './choose-troops.component.html',
  styleUrls: ['./choose-troops.component.scss']
})
export class ChooseTroopsComponent implements OnInit {
  @Input() troops: any;
  @Output() sendTroopMap = new EventEmitter<Map<string, number>>();
  value = 0;

  constructor(private battleService: BattleService) { }

  ngOnInit(): void {
  }

  addTroopMap(newMap: Map<string, number>) {
    this.sendTroopMap.emit(newMap);
  }

  firstLetterCapital(text: string) {
    return this.battleService.firstLetterCapital(text);
  }
}
