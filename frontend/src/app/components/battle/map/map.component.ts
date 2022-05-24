import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  activeSize = 1;
  @Input() kingdoms: any[] = [];
  @Output() kingdomInfo = new EventEmitter<any[]>();

  constructor() { }

  ngOnInit(): void {
  }

  createRange(number: number){
    return new Array(number);
  }

  showCastle(index: number) {

    for (let kingdom of this.kingdoms) {
      let divCoordinateX;
      let divCoordinateY;

      if (index < 10) {
        divCoordinateX = index;
        divCoordinateY = 0;
      } else {
        divCoordinateX = index % 10 > 0 ? index % 10 : 0;
        divCoordinateY = index / 10 >= 1 ? Math.floor(index / 10) : index;
      }

      if (kingdom.coordinateX === divCoordinateX && kingdom.coordinateY === divCoordinateY) {
        return [true, kingdom.name, kingdom.id, kingdom.ruler];
      }
    }
    return [false, null];
  }

  setKingdomInfo(kingdomInfo: any[]) {
    this.kingdomInfo.emit(kingdomInfo);
  }
}
