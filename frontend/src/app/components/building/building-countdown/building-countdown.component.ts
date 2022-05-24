import {Component, Input, OnInit} from '@angular/core';
import { CountdownModule } from "ngx-countdown";

@Component({
  selector: 'app-building-countdown',
  templateUrl: './building-countdown.component.html',
  styleUrls: ['./building-countdown.component.scss']
})
export class BuildingCountdownComponent implements OnInit {
  @Input() timeToComplete!: number;
  @Input() totalTime!: number;


  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.timeToComplete)
      console.log(this.totalTime)
    },300)

  }

}
