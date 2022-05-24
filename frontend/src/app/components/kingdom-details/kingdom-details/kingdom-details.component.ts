import {Component, OnInit} from '@angular/core';
import { KingdomService } from 'src/app/services/kingdom.service';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-kingdom-details',
  templateUrl: './kingdom-details.component.html',
  styleUrls: ['./kingdom-details.component.scss']
})
export class KingdomDetailsComponent implements OnInit {
  kingdomId: any;
  kingdom: any;
  buildings: any[] = [];
  upgradingBuildings: any[] = [];
  troops: any;
  resources: any;
  loading: boolean = true;
  error: any;

  constructor(private kingdomService: KingdomService,private route: ActivatedRoute,private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    // setTimeout(() => {
      this.kingdomId = this.route.snapshot.paramMap.get("id");
      console.log(this.kingdomId);
      this.kingdomService.getKingdomDetails(this.kingdomId).then(res => {
        this.kingdom = res.data.kingdom;
        console.log(this.kingdom);
        this.resources = res.data.resources;
        this.buildings = res.data.buildings;
        this.buildings = this.buildings.filter((building => building.type !== "marketplace" && building.type !== "hideout"
          && building.type !== "mercenaries_inn"));
        this.upgradingBuildings = this.buildings.filter(building => building.endTime > Math.floor(Date.now() / 1000));
        this.buildings = this.buildings.map((building) => ({
          ...building,
          isUpgrading: this.upgradingBuildings.some(({type}) => type === building.type)
        }));
        this.troops = res.data.troops;
        this.loading = !this.loading;
        console.log(this.kingdom);
        console.log(this.resources);
        console.log(this.buildings);
        console.log(this.troops);
      })
      .catch(err => {
        this.error = err.response.data;
        this.loading = false;
        console.log(this.error)
        if(this.error.error) {
          this.toastr.error(this.error.error);
        } else {
          this.toastr.error(this.error);
        }
        if(err.response.status === 404) {
          this.router.navigate(['/404']);
        } else {
          this.router.navigate(['/kingdoms/']);
        }
      })
    // }, 500);
  }

}
