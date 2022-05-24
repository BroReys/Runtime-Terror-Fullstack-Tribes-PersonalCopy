import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChatUiService} from "../../../services/chat-ui.service";
import {Subscription} from "rxjs";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.scss']
})
export class AddChatComponent implements OnInit {
  @Output() onAddChat: EventEmitter<any> = new EventEmitter();
  text!: string;
  subject!: string;
  showAddChat!: boolean;
  subscription!: Subscription;
  members!: string;

  constructor(private chatUiService: ChatUiService, private toastr: ToastrService) {
    this.subscription = this.chatUiService
    .onToggle()
    .subscribe((value) => (this.showAddChat = value));
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text || !this.subject){
      this.toastr.error('Please enter subject and first message!');
      return;
    }

    if(this.members){
      const newChat = {
        text: this.text,
        subject: this.subject,
        members: this.members.split(", ")
      }
      this.onAddChat.emit(newChat);
    } else {
      const newChat = {
        text: this.text,
        subject: this.subject,
        members: ""
      }
      this.toastr.info('Chat created without other members!');
      this.onAddChat.emit(newChat);
    }

    this.text ='';
    this.subject ='';
    this.members = '';
  }
}
