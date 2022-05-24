import { Component, OnInit } from '@angular/core';
import {ChatUiService} from '../../../services/chat-ui.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit {
  title: string = 'Your Chats';
  showAddChat!: boolean;
  subscription!: Subscription;

  constructor(private chatUiService: ChatUiService) {
    this.subscription = this.chatUiService
    .onToggle()
    .subscribe((value) => (this.showAddChat = value));
  }

  ngOnInit(): void {
  }

  toggleAddChat() {
    this.chatUiService.toggleAddChat();
  }
}
