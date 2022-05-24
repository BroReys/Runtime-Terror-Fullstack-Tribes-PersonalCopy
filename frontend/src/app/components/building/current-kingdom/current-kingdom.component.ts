import {Component, Input, OnInit} from '@angular/core';
import {BuildingService} from "../../../services/building.service";
import {BuildingInterface} from "../interface/building-interface";

@Component({
  selector: 'app-current-kingdom',
  templateUrl: './current-kingdom.component.html',
  styleUrls: ['./current-kingdom.component.scss']
})
export class CurrentKingdomComponent implements OnInit {
  resources: any[] = [];
  buildings: BuildingInterface[] = [];
  kingdomName!: string;
  ruler!: string;
  food: any;
  gold: any;
  loyalty: any;
  error!: string;
  @Input() currentlyUpgradingBuildings: any[] = [];
  loadingData: boolean = true;
  currentTime = Math.floor(Date.now() / 1000);

  constructor(private buildingService: BuildingService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.buildingService.getKingdomDetails()
        .then(res => {
          this.food = res.data.resources[0].amount;
          this.gold = res.data.resources[1].amount;
          this.kingdomName = res.data.kingdom.kingdomName;
          this.ruler = res.data.kingdom.ruler;
          this.buildings = res.data.buildings;
          this.buildings = this.buildings.filter((building => building.type !== "marketplace" && building.type !== "hideout"
            && building.type !== "mercenaries_inn"));
        })
        .catch(err => {
          this.error = err.response.data;
        })
    }, 300);

    this.setLoadingData();
  }


  setLoadingData() {
    this.loadingData = !this.loadingData;
  }



}
