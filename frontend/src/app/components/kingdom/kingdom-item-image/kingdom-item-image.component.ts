import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-kingdom-item-image',
  templateUrl: './kingdom-item-image.component.html',
  styleUrls: ['./kingdom-item-image.component.scss']
})
export class KingdomItemImageComponent implements OnInit {
  @Input() imgSrc = '';
  @Input() small = true;
  @Input() big = false;

  constructor() { }

  ngOnInit(): void {
  }

}
