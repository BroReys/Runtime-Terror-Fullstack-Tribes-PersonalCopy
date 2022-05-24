import { Injectable } from '@angular/core';
import axios from 'axios';
import {environment} from "../../environments/environment";
import {Subject} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatsChanged = new Subject<void>(); //object provided by rxjs package like EventEmitter
  newChats!: number;

  constructor(private userService: UserService) {
    setInterval(()=> { this.unreadChats()
    .then((count)=> { this.newChats = count})
    .then(() => {
      this.chatsChanged.next();
    })}, 30000);
  }

  getChats() {
    return axios.get(environment.apiURL+'chats');
  }

  addChat(chat: any) {
    return axios.post(environment.apiURL+'chats',{subject: chat.subject, text: chat.text, members: chat.members});
  }

  getMessages(chat: any) {
    return axios.get(environment.apiURL+'chat/' + chat.id);
  }

  addMessage(newMessage: { chat: any; text: string }) {
    return axios.post(environment.apiURL+'chats/' + newMessage.chat.id + '/members', {text: newMessage.text});
  }

  addMembers(newChatMembers: { chat: any; newMembers: any[] }) {
    return axios.put(environment.apiURL + 'chats/' + newChatMembers.chat.id + '/members', {members: newChatMembers.newMembers});
  }

  async unreadChats() {
    let chats: any[] = [];
    let count = 0;

    await this.getChats().then(res => {
      chats = res.data;
    })

    for (let i = 0; i < chats.length; i++) {
      if (chats[i].lastViewed <= chats[i].messages[0].createdAt && chats[i].messages[0].author !== this.userService.user.username) {
        count++;
      }
    }
    return count;
  }

  leaveChat(chat: any) {
    return axios.delete(environment.apiURL + 'chats/' + chat.id + '/members');
  }
}
