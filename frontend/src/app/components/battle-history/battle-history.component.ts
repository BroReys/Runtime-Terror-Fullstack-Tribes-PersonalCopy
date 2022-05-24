import {Component, HostListener, OnInit} from '@angular/core';
import {BattleService} from "../../services/battle.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-battle-history',
  templateUrl: './battle-history.component.html',
  styleUrls: ['./battle-history.component.scss']
})
export class BattleHistoryComponent implements OnInit {
  attackerBattles: any[] = [];
  defenderBattles: any[] = [];
  loading: boolean = true;
  attackerBattlesSlice: any[] = [];
  defenderBattlesSlice: any[] = [];
  pageSize: number = 5;

  constructor(private battleService: BattleService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadBattles();
    }, 500);
  }

  loadBattles() {
    this.battleService.getAllBattles()
    .then(res => {
      try {
        this.attackerBattles = res.data.attacker;
        this.defenderBattles = res.data.defender;
        this.attackerBattlesSlice = this.attackerBattles.slice(0, this.setPageSize());
        this.defenderBattlesSlice = this.defenderBattles.slice(0, this.setPageSize());
        this.loading = true ? !this.loading : this.loading;
      } catch (ignore) {
      }
    })
  }

  onPageAttackerChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.attackerBattles.length) {
      endIndex = this.attackerBattles.length;
    }
    this.attackerBattlesSlice = this.attackerBattles.slice(startIndex, endIndex);
  }

  onPageDefenderChange(eventTwo: PageEvent) {
    const startIndex = eventTwo.pageIndex * eventTwo.pageSize;
    let endIndex = startIndex + eventTwo.pageSize;
    if (endIndex > this.defenderBattles.length) {
      endIndex = this.defenderBattles.length;
    }
    this.defenderBattlesSlice = this.defenderBattles.slice(startIndex, endIndex);
  }

  setPageSize() {
    let width = window.innerWidth;
    if (width >= 2560) {
      this.pageSize = 7;
    } else if (width >= 1600) {
      this.pageSize = 5;
    } else if (width >= 1024) {
      this.pageSize = 4;
    } else if (width < 1024) {
      this.pageSize = 3;
    } else if (width < 768) {
      this.pageSize = 1;
    }
    return this.pageSize;
  }

  reloadBattles() {
    this.loading = true;
    setTimeout(() => {
      this.loadBattles();
    }, 1000);
  }

  getBackgroundCode(battleResult: string, battleRole: string): any {
    switch (battleResult) {
      case 'win':
        return battleRole === 'attacker' ? '#059669' : '#dc2626';
      case 'loss':
        return battleRole === 'attacker' ? '#dc2626' : '#059669';
      case 'draw':
        return '#525252';
      default:
        return '#4f46e5';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setPageSize()
  }

  countNews(battles: any[]) {
    let count = 0;
    for (let i = 0; i < battles.length; i++) {
      if (!battles[i]['beenRead']) {
        count++;
      }
    }
    return count;
  }

}
