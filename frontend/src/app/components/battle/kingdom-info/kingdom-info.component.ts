import {Component, Input, OnInit} from '@angular/core';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-kingdom-info',
  templateUrl: './kingdom-info.component.html',
  styleUrls: ['./kingdom-info.component.scss']
})
export class KingdomInfoComponent implements OnInit {
  castle1 = '../../../../assets/img/castles-large/castle1.png';
  castle2 = '../../../../assets/img/castles-large/castle2.png';
  castle3 = '../../../../assets/img/castles-large/castle3.png';
  castle4 = '../../../../assets/img/castles-large/castle4.png';
  camp = '../../../../assets/img/castles-large/fire.png'
  @Input() loadingData: boolean = false;
  @Input() report: any;
  @Input() kingdomName = null;
  @Input() kingdomRuler = null;
  @Input() kingdomId:number = 0;

  constructor(private battleService: BattleService) { }

  ngOnInit(): void {
  }

  getCastleImage() {
    // @ts-ignore
    if (this.kingdomName.startsWith('Bandits')) {
      return this.camp;

    } else {
      if (this.kingdomId % 2 === 0) {
        return this.castle1;
      } else if (this.kingdomId % 3 === 0) {
        return this.castle2;
      } else if (this.kingdomId % 5 === 0) {
        return this.castle3;
      } else {
        return this.castle4;
      }
    }
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
