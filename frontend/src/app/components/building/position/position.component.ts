import { Component, OnInit } from '@angular/core';
import {BuildingService} from "../../../services/building.service";

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {

  constructor(private buildingService: BuildingService) { }

  ngOnInit(): void {
  }

}
