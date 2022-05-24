import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BattleReportComponent} from "../battle-report/battle-report.component";
import {BattleService} from "../../services/battle.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-battle-card',
  templateUrl: './battle-card.component.html',
  styleUrls: ['./battle-card.component.scss']
})
export class BattleCardComponent implements OnInit {
  battle1 = '../../../assets/img/battle/battle1.png';
  battle2 = '../../../assets/img/battle/battle2.png';
  battle3 = '../../../assets/img/battle/battle3.png';
  battle4 = '../../../assets/img/battle/battle4.png';
  @Input() background: any;
  @Input() battle: any;
  @Output() battleId = new EventEmitter();

  constructor(private modal: MatDialog, private battleService: BattleService, private router: Router) {
  }

  ngOnInit(): void {
    this.reloadPage();
  }

  reloadPage() {
    let comeback = this.getLeftTimeComeback() * 1000;
    let arrival = this.getLeftTimeArrival() * 1000;

    if (comeback > 0) {
      setTimeout(() => {
        this.router.navigateByUrl('/fake', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/battles-details']);
        });
      }, comeback);
    }

    if (arrival > 0) {
      setTimeout(() => {
        this.router.navigateByUrl('/fake', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/battles-details']);
        });
      }, arrival);
    }
  }

  getBattleId() {
    this.battleId.emit(this.battle.id);
  }

  getBattleImage(battleId: number) {
    if (battleId % 2 === 0) {
      return this.battle1;
    } else if (battleId % 3 === 0) {
      return this.battle2;
    } else if (battleId % 5 === 0) {
      return this.battle3;
    } else {
      return this.battle4;
    }
  }

  getLeftTimeArrival() {
    let now = Date.now() / 1000;
    let arrival = this.battle['timeOfArrival'];
    return arrival - now;
  }

  getLeftTimeComeback() {
    let now = Date.now() / 1000;
    if (this.battle['timeOfComeback']) {
      let comeback = this.battle['timeOfComeback'];
      return comeback - now;
    } else {
      return -1;
    }
  }

  showModal(battleId: number) {
    this.modal.open(BattleReportComponent, {
      data: {
        battleId: battleId
      }
    });
  }

  timeStampToDate(date: number) {
    return this.battleService.timeStampToDate(date);
  }
}
