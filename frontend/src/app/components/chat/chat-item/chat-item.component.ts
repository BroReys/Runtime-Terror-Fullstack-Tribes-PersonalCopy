import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faDoorOpen} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {
  @Output() onToggleChatView: EventEmitter<any> = new EventEmitter;
  @Output() onLeaveChat: EventEmitter<any> = new EventEmitter;
  @Input() chat: any
  @Input() isActive!: boolean;
  @Input() isUnread!: boolean;
  faTimes = faDoorOpen;

  constructor() { }

  ngOnInit(): void {
  }

  onLeave(chat: any) {
    console.log(chat);
    this.onLeaveChat.emit(chat);
  }

  onToggle(chat: any){
    this.onToggleChatView.emit(chat);
  }
}
