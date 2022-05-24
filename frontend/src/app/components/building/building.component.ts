import {Component, OnInit} from '@angular/core';
import {BuildingService} from "../../services/building.service";
import {PositionInterface} from "./interface/position-interface";
import {BuildingModalComponent} from "./building-modal/building-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {
  buildings: any[] = [];
  allBuildings: any[] = [];
  positions: PositionInterface[] = [];
  maxBuildings: number;
  imagePath: string[] = [];
  error: any;
  townhallLevel!: number;
  upgradingBuildings: any[] = [];
  canBuild: boolean = false;
  loadingData : boolean = true;


  constructor(private buildingService: BuildingService,
              private modalService: NgbModal, private router: Router) {
    this.imagePath[0] = "assets/img/buildings/empty.png";
    this.imagePath[1] = "assets/img/buildings/townhall2.png";
    this.imagePath[2] = "assets/img/buildings/mine.png";
    this.imagePath[3] = "assets/img/buildings/farm.png";
    this.imagePath[4] = "assets/img/buildings/wall.png";
    this.imagePath[5] = "assets/img/buildings/barracks.png";
    this.imagePath[6] = "assets/img/buildings/academy.png";
    this.maxBuildings = 6;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.buildingService.getKingdomDetails()
        .then(res => {
          this.buildings = res.data.buildings.sort((a: { position: number; }, b: { position: number; }) => a.position > b.position ? 1 : -1);
          this.buildings = this.buildings.filter((building => building.type !== "marketplace" && building.type !== "hideout"
            && building.type !== "mercenaries_inn"));
          this.getPositions();
        }).catch(err => {
          this.error = err.response.data;
        })
    }, 150);

    setTimeout(() => {
      this.router.navigateByUrl('/404', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/buildings']);
      });
    }, 60000)

  }


  setLoadingData() {
    this.loadingData = !this.loadingData;
  }

  getPositions() {
    for (let i = 0; i < this.maxBuildings; i++) {
      let currentBuilding = this.buildings.filter((building => building.position === i + 1));
      if (currentBuilding[0]) {
        this.positions[i] = {
          index: i + 1,
          isOccupied: true,
          isConstructing: currentBuilding[0].status,
          building: currentBuilding[0]
        };
      } else {
        switch (i + 1) {
          case 1: {
            this.positions[i] = {
              index: i + 1,
              isOccupied: false,
              isConstructing: false,
              building: {type: "townhall", level: 0}
            };
            break;
          }
          case 2: {
            this.positions[i] = {
              index: i + 1,
              isOccupied: false,
              isConstructing: false,
              building: {type: "mine", level: 0}
            };
            break;
          }
          case 3: {
            this.positions[i] = {
              index: i + 1,
              isOccupied: false,
              isConstructing: false,
              building: {type: "farm", level: 0}
            };
            break;
          }
          case 4: {
            this.positions[i] = {
              index: i + 1,
              isOccupied: false,
              isConstructing: false,
              building: {type: "wall", level: 0}
            };
            break;
          }
          case 5: {
            this.positions[i] = {
              index: i + 1,
              isOccupied: false,
              isConstructing: false,
              building: {type: "barracks", level: 0}
            };
            break;
          }
          case 6: {
            this.positions[i] = {
              index: i + 1,
              isOccupied: false,
              isConstructing: false,
              building: {type: "academy", level: 0}
            };
            break;
          }
        }
      }
    }
    this.townhallLevel = this.positions[0].building.level;
    this.upgradingBuildings = this.buildings.filter(building => building.endTime > Math.floor(Date.now() / 1000));

    this.setCanBuild();
    this.setLoadingData();
  }

  setCanBuild() {
    if (this.upgradingBuildings.length <= 0) {
      this.canBuild = true;
    }
  }

  open(position: any, building: any) {
    const modalRef = this.modalService.open(BuildingModalComponent, {size: "lg"});
    modalRef.componentInstance.position = position;
    modalRef.componentInstance.title = position.building.type.toUpperCase();
    modalRef.componentInstance.building = building;
    modalRef.componentInstance.townhallLevel = this.townhallLevel;
    modalRef.componentInstance.upgradingBuildings = this.upgradingBuildings;
    modalRef.componentInstance.freeQueue = this.canBuild;
  }

}

