import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BuildingService} from "../../../services/building.service";
import {BuildingRules} from "../interface/building-rules-interface";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-building-modal',
  templateUrl: './building-modal.component.html',
  styleUrls: ['./building-modal.component.scss'],
})
export class BuildingModalComponent implements OnInit {

  @Input() position: any;
  @Input() building: any;
  @Input() townhallLevel!: number;
  @Input() upgradingBuildings: any[] = [];
  @Input() freeQueue!: boolean;
  canBeBuild: boolean = false;
  title: any;
  isEmpty: boolean = false;
  error!: string;
  nextLevelRules!: BuildingRules;
  currentLevelRules!: BuildingRules;
  clicked = false;
  delay = 2000;
  loadingData: boolean = true;

  constructor(public activeModal: NgbActiveModal,
              private buildingService: BuildingService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.building.status === undefined) {
      this.isEmpty = true;
    }

    if (this.building.status === true) {
      this.canBeBuild = true;
    }

    setTimeout(() => {
      this.buildingService.getBuildingRules(this.position.index, this.position.building.level + 1)
        .then(res => {
          this.nextLevelRules = res.data;
          console.log(this.nextLevelRules);
        })
        .catch(err => console.log(err.data))
      this.buildingService.getBuildingRules(this.position.index, this.position.building.level)
        .then(res => {
          this.currentLevelRules = res.data;
          console.log(this.nextLevelRules);
          this.setLoadingData();
        })
        .catch(err => {
          console.log(err.data);
          this.error = err.response.data;
          this.toastr.error(this.error);
        })

    })
  }

  setLoadingData() {
    this.loadingData = !this.loadingData;
  }

  upgradeTime() {
    let time = new Date(0);
    time.setSeconds(this.nextLevelRules.constructionTime);
    return time.toISOString().substring(11, 19);
  }

  downgradeTime() {
    let time = new Date(0);
    time.setSeconds(this.nextLevelRules.constructionTime / 10);
    return time.toISOString().substring(11, 19);
  }

  add() {
    this.buildingService.addBuilding({type: this.building.type})
      .then(response => {
        console.log(response);
        this.toastr.success("Building is constructing");
        setTimeout(() => {
          this.router.navigateByUrl('/404', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/buildings']);
          });
          this.activeModal.close();
        }, this.delay)
      })
      .catch(err => {
        console.log(err.response.data.error);
        this.error = err.response.data.error;
        this.toastr.error(this.error);
      });
  }

  upgrade() {
    this.buildingService.upgradeBuilding(this.building.id)
      .then(response => {
        console.log(response.data);
        this.toastr.success("Upgrade successfully started");
        setTimeout(() => {
          this.router.navigateByUrl('/404', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/buildings']);
          });
          this.activeModal.close();
        }, this.delay)
      })
      .catch(err => {
        console.log(err.response.data);
        this.error = err.response.data.error;
        this.toastr.error(this.error);
      });
  }

  downgrade() {
    this.buildingService.downgradeBuilding(this.building.id)
      .then(response => {
        console.log(response.data);
        this.toastr.success("Downgrade successfully started");
        setTimeout(() => {
          this.router.navigateByUrl('/404', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/buildings']);
          });
          this.activeModal.close();
        }, this.delay)
      })
      .catch(err => {
        console.log(err.response.data);
        this.error = err.response.data.error;
        this.toastr.error(this.error);
      })

  }

  downgradeInstant() {
    this.buildingService.downgradeInstantBuilding(this.building.id)
      .then(response => {
        console.log(response.data);
        this.toastr.success(response.data.status);
        setTimeout(() => {
          this.router.navigateByUrl('/404', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/buildings']);
          });
          this.activeModal.close();
        }, this.delay)
      })
      .catch(err => {
        console.log(err.response.data);
        this.error = err.response.data.error;
        this.toastr.error(this.error);
      })
  }

}
