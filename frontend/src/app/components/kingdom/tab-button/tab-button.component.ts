import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss']
})
export class TabButtonComponent implements OnInit {
  @Input() kingdom: any;
  @Input() activeTab: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
