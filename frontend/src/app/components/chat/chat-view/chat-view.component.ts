import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  @Input() message: any;
  @Input() index!: number;

  constructor() { }

  ngOnInit(): void {
  }

  isEven(): boolean{
    return this.index % 2 === 0;
  }

  formatDate(createdAt: string) {
    let dateTimeArr: string[] = createdAt.split("T");
    let dateTimeFormatted: string = dateTimeArr[0].slice(dateTimeArr[0].length -5,dateTimeArr[0].length).concat(" "+dateTimeArr[1].slice(0,5));

    return dateTimeFormatted;
  }
}
