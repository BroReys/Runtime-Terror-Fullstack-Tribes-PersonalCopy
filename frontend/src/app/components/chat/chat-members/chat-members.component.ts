import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-members',
  templateUrl: './chat-members.component.html',
  styleUrls: ['./chat-members.component.scss']
})
export class ChatMembersComponent implements OnInit {
  @Input() member: any;

  constructor() { }

  ngOnInit(): void {
  }

}
