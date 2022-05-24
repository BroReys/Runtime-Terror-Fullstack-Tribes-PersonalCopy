import { Component, OnInit } from '@angular/core';
import {TroopsService} from "../../../services/troops-service/troops.service";
import {NgForm} from "@angular/forms";
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-troop-details',
  templateUrl: './troop-details.component.html',
  styleUrls: ['./troop-details.component.scss']
})
export class TroopDetailsComponent implements OnInit {
  // --->variables for responses<---
  response:any;
  responseUpdateArray:any;
  error:any;
  // --->variables for responses<---

  troopsService: TroopsService;
  toastrService: ToastrService;
  quantityInBarracks = 0;

  // ---> slider amount buy-remove <---
  minBuy = 1;
  maxBuy = 1000;
  minRemove = 1;
  maxRemove = 0;
  totalGoldCost:any;
  totalGoldToRefund:any;
  // ---> slider amount buy-remove <---

  //--->variables for troop built countdowns <---
  countdown:any;
  currentDate:any;
  firstTroopEndTime:any;
  lastTroopEndTime:any;
  firstTroopTimeRemaining:any;
  lastTroopTimeRemaining:any;
  //--->variables for troop countdowns <---

  //--->variables for troop upgrade countdowns <---
  troopUpgrading:boolean = false;
  upgradeEndTime:any;
  //--->variables for troop upgrade countdowns <---

  // --->variable for countdown<---
  timeRemaining:any;


  updating:boolean = false;

  constructor(troopsService: TroopsService, toastrService:ToastrService) {
    this.troopsService =troopsService;
    this.toastrService = toastrService;
  }

  ngOnInit(): void {
    this.troopsService.chosenQuantity = 1;
    this.totalGoldCost = this.troopsService.chosenTroop.gold_cost;
    this.totalGoldToRefund = 0;
    this.currentDate = Math.floor(Date.now()/1000);
    this.showChosenTroopAmountInBarracks();
    this.getUpgradeTimeRemaining();
    // this.adjustRemove();
  }
  //TODO REFACTOR
  onClickButtonUpgrade(troopName:any) { // sends value from button click - troopName
    // set updating to true, because it started running this function and data are processing - promises stated
    this.updating = true;
    // now I call troop service to call upgrade troop endpoint
    this.troopsService
    .upgradeTroop(troopName)
    .then((res:any) => {
      this.response = res.data;
      this.toastrService.success('Troops successfully queued for upgrade!');
      this.ngOnInit();
      // if the response is 200 I need to display updated values -> meaning i need to update fetched object in troopService ->chosenTroop
      this.troopsService
      .fetchTroopTypes()
      .then((res:any) => {
        this.responseUpdateArray = res.data;
        // to do that I can filter res.data where I look for same name as troopName input and access furst element from object tree and save it to chosenTroop in the Service
        this.troopsService.chosenTroop = this.responseUpdateArray.filter((troop:any) => troop.name === troopName)[0];
        // once this is done I can set updating as false
        this.updating = false;
      })
      .catch((err:any) => {
        this.updating = false;
        console.log(err);
      })
      console.log(this.response)
    })
    .catch((err:any) => {
      this.updating = false;
      this.error = err.response.data.error;
      this.toastrService.error(this.error)
      console.log(err);
      this.ngOnInit();
    })
  }

  // TODO prepared for sending data to backend endpoint - buyTroops
  onSubmitBuy(submittedForm: NgForm) {
    this.troopsService.buyTroop(submittedForm.value).then((res:any) => {
      this.response = res.data;
      this.toastrService.success('Troops hired, check barracks!');
      this.troopsService.chosenQuantity = 1;
      this.ngOnInit();
    }).catch((err:any) => {
      this.error = err.response.data.error;
      this.toastrService.error(this.error)
      this.ngOnInit();
    })
    console.log(submittedForm.value)
  }

  onInputChange(event:any) {
    this.troopsService.chosenQuantity = event.value;
    this.totalGoldCost = event.value * this.troopsService.chosenTroop.gold_cost
  }

  onInputChangeRemove(event:any) {
    this.troopsService.chosenQuantityRemove = event.value;
    this.totalGoldToRefund = Math.floor((event.value * this.troopsService.chosenTroop.gold_cost) / 2)
  }

  showChosenTroopAmountInBarracks() {
    this.updating = true;
    this.troopsService.showTroopsInBarracksByType().then((res:any) => {
      this.quantityInBarracks = res.data[0].length

      this.updating = false;
      //TODO this adjusts the max amount to remove in slide bar, move it to somewhere else?
      if (this.quantityInBarracks > 1) {
        // ----> count down logic for first and last troop !IMPORTANT ->backend returns array in Desc order <---
        this.lastTroopEndTime = res.data[0][0].endTime;
        this.firstTroopEndTime = res.data[0][this.quantityInBarracks-1].endTime;

        this.lastTroopTimeRemaining = this.lastTroopEndTime - this.currentDate;
        this.firstTroopTimeRemaining = this.firstTroopEndTime - this.currentDate;
        // ----> count down logic for first and last troop <---
        this.maxRemove = this.quantityInBarracks - 1;
      } else if (this.quantityInBarracks === 1) {
        this.lastTroopEndTime = res.data[0][0].endTime;
        this.lastTroopTimeRemaining = this.lastTroopEndTime - this.currentDate;
        this.maxRemove = 0;
      } else {
        this.maxRemove = 0;
      }
    }).catch((err:any) => {
      this.error = err.response.data.error;
      this.updating = false;
    })
  }

  adjustRemove() {
    if (this.quantityInBarracks != 0) {
      this.maxRemove = this.quantityInBarracks - 1;
      return this.maxRemove;
    } else {
      this.maxRemove = 0;
      return this.maxRemove;
    }
  }

  onSubmitRemove(quantityRemove:any) {
    this.troopsService.removeTroop(quantityRemove).then((res:any) => {
      this.response = res.data;
      this.toastrService.success('Troops removed and gold refunded');
      this.troopsService.chosenQuantityRemove = 0;
      this.ngOnInit();
    }).catch((err:any) => {
      this.error = err.response.data.error;
      this.toastrService.error(this.error)
      this.ngOnInit();
    })
  }

  getUpgradeTimeRemaining() {
    this.troopsService.getTroopUnitLevel().then((res:any) => {
      this.upgradeEndTime = res.data.endTime;
      console.log(res.data.endTime);
      if (!this.upgradeEndTime) {
        return;
      }
      this.troopUpgrading = true;
      let currentDate = Math.floor(Date.now()/1000);
      this.timeRemaining =this.upgradeEndTime - currentDate;
      console.log(this.timeRemaining);
    }).catch((err:any) => {
      console.log(err);
    })
  }
}
