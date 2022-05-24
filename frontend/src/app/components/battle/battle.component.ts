import {Component, OnInit} from '@angular/core';
import {BattleService} from "../../services/battle.service";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  troops: any[] = [];
  kingdoms: any[] = [];
  loadingData: boolean = true;
  loadingKingdomData: boolean = false;
  troopsToRequest = this.battleService.getTroopsToRequest();
  battleReport: any = null;
  error: any;
  hasBattleStarted: boolean = false;

  defendingKingdomId: number = 0;
  defendingKingdomName = null;
  defendingKingdomRuler = null;

  constructor(private battleService: BattleService, private userService: UserService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.battleService.getKingdoms()
      .then(res => {
        this.kingdoms = res.data;
      })
      .then(() => {
        this.battleService.getTroops()
        .then(res => {
          this.troops = res.data;
          this.troops = this.troops.filter(element => element.type !== 'settlers');
          this.setLoadingData();
        })
        .then(() => {
          this.battleService.getActiveBattles()
          .then(res => {
            let activeBattles: any = res.data;

            for (let i = 0; i < activeBattles.outgoing.length; i++) {

              this.toastr.info('Time of Arrival: ' +
                this.battleService.timeStampToDate(activeBattles.outgoing[i].timeOfArrival)
                + '\nTime of Comeback: '
                + this.battleService.timeStampToDate(activeBattles.outgoing[i].timeOfComeback),
                'Attack on ' + activeBattles.outgoing[i].defender,
                {disableTimeOut: true, closeButton: true});

            }
            for (let i = 0; i < activeBattles.incoming.length; i++) {

              this.toastr.warning('Time of arrival: '
                + this.battleService.timeStampToDate(activeBattles.incoming[i].timeOfArrival),
                'Incoming attack by ' + activeBattles.incoming[i].attacker,
                {disableTimeOut: true, closeButton: true})
            }
          })
        })
      })
      .catch(err => {
        this.error = err.response.data;
        this.toastr.error(this.error.error);
      })
    }, 500);
  }

  setLoadingData() {
    this.loadingData = !this.loadingData;
  }

  setLoadingKingdomData() {
    this.loadingKingdomData = !this.loadingKingdomData;
  }

  getKingdomInfo(kingdomInfo: any[]) {
    this.defendingKingdomId = kingdomInfo[0];
    this.defendingKingdomName = kingdomInfo[1];
    this.defendingKingdomRuler = kingdomInfo[2];
  }

  getTroops(newMap: Map<string, number>) {
    for (const [key, value] of newMap) {
      for (const [troopKey, troopValue] of Object.entries(this.troopsToRequest)) {
        if (key === troopValue.type) {
          troopValue.quantity = value;
        }
      }
    }
  }

  getBattleReport() {
    this.setLoadingKingdomData()

    setTimeout(() => {
      this.battleService.getLatestBattleReport(this.defendingKingdomId)
      .then(res => {
        this.battleReport = res.data;
        this.setLoadingKingdomData();
      })
      .catch(err => {
        this.setLoadingKingdomData();
      });
    }, 500);
  }

  startBattle() {
    this.setLoadingData();
    this.troopsToRequest = this.troopsToRequest.filter(e => e.quantity > 0);
    this.battleService.startBattle(this.troopsToRequest, this.defendingKingdomId, this.defendingKingdomRuler)
    .then(res => {
      this.toastr.success('Battle started!');
      this.troopsToRequest = this.battleService.getTroopsToRequest();
      this.defendingKingdomId = 0;
      this.hasBattleStarted = !this.hasBattleStarted;
      setTimeout(() => {
        this.hasBattleStarted = !this.hasBattleStarted;
      }, 9000)
    })

    .then(() => {
      this.battleService.getTroops()
      .then(res => {
        this.troops = res.data;
        this.troops = this.troops.filter(element => element.type !== 'settlers');
        this.setLoadingData();
      })

    })
    .catch(err => {
      this.setLoadingData();
      this.troopsToRequest = this.battleService.getTroopsToRequest();
      this.error = err.response.data;
      this.toastr.error(this.error.error);
    });
  }
}
