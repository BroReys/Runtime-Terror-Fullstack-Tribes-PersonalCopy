import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-battle-report',
  templateUrl: './battle-report.component.html',
  styleUrls: ['./battle-report.component.scss']
})
export class BattleReportComponent implements OnInit {
  loading: boolean = true;
  battleDetails: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private battleService: BattleService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.battleService.getBattleDetail(this.data.battleId)
      .then(res => {
        this.battleDetails = res.data;
        this.loading = !this.loading;
      })
    }, 500);
  }


}
