import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-kingdom-grid',
  templateUrl: './kingdom-grid.component.html',
  styleUrls: ['./kingdom-grid.component.scss']
})
export class KingdomGridComponent implements OnInit {

  @Input() kingdoms: any[] = [];
  kingdomsGrid: boolean[][] = [...Array(10)].map(e => Array(10));

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    for(let kingdom of this.kingdoms){
      if( kingdom.coordinateX != null && kingdom.coordinateY != null){
        this.kingdomsGrid[kingdom.coordinateX][kingdom.coordinateY] = true;
      }
    }
  }

}
