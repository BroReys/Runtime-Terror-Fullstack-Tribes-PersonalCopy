import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-castle',
  templateUrl: './castle.component.html',
  styleUrls: ['./castle.component.scss']
})
export class CastleComponent implements OnInit {
  castle1 = '../../../../assets/img/castle1.png';
  castle2 = '../../../../assets/img/castle2.png';
  castle3 = '../../../../assets/img/castle3.png';
  castle4 = '../../../../assets/img/castle4.png';
  camp = '../../../../assets/img/fire.png';
  @Input() kingdomId: number = 0;
  @Input() kingdomName: string = '';
  @Input() kingdomRuler: string = '';
  @Output() kingdomInfo = new EventEmitter<any[]>();

  constructor() { }

  ngOnInit(): void {
  }

  getCastleImage(kingdomId: number) {
    if (this.kingdomName.startsWith('Bandits')) {
      return this.camp;

    } else {
      if (kingdomId % 2 === 0) {
        return this.castle1;
      } else if (kingdomId % 3 === 0) {
        return this.castle2;
      } else if (kingdomId % 5 === 0) {
        return this.castle3;
      } else {
        return this.castle4;
      }
    }
  }

  getKingdomInfo() {
    this.kingdomInfo.emit([this.kingdomId, this.kingdomName, this.kingdomRuler]);
  }
}
