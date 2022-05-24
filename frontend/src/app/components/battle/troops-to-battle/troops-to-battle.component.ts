import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-troops-to-battle',
  templateUrl: './troops-to-battle.component.html',
  styleUrls: ['./troops-to-battle.component.scss']
})
export class TroopsToBattleComponent implements OnInit {
  animationState = 'in';
  constructor() { }

  ngOnInit(): void {
  }
}
