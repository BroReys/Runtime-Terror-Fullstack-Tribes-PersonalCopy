import {Component, Input} from '@angular/core';
import {KingdomDataService} from "../../../services/kingdom-data.service";

@Component({
  selector: 'app-kingdom-item',
  templateUrl: './kingdom-item.component.html',
  styleUrls: ['./kingdom-item.component.scss']
})
export class KingdomItemComponent {
  @Input() kingdom: any;
  @Input() kingdoms: any[] = [];

  constructor(private kingdomDataService: KingdomDataService) {
  }

  changeKingdom(id: number) {
    this.kingdomDataService.changeData(id);
    window.sessionStorage.setItem('activeKingdomId', id.toString());
  }

}
