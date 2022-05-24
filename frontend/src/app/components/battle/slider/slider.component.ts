import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BattleService} from "../../../services/battle.service";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() max: number = 0;
  @Input() type: string = '';
  @Output() troopMap = new EventEmitter<Map<string, number>>();

  constructor(private battleService: BattleService) {
  }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }
    return value;
  }

  onInputChange(event: any) {
    const map = new Map();
    map.set(this.type, event.value);
    this.troopMap.emit(map);
  }
}
