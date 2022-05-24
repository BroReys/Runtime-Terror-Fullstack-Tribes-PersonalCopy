import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  chats: any[] = [];
  messagesToView: any[] = [];
  chat: any;
  text!: string;
  members:any[] = [];
  newMembers!: string;
  loading: boolean = true;
  currentUsername!: string;
  activeChats: boolean[] = [];
  unreadChats: boolean[] = [];
  error: any;

  constructor(private chatService: ChatService, public userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    setTimeout(() =>{
      this.chatService.getChats()
      .then(res => {
        this.chats = res.data;
        if (this.chats.length > 0) {  //if chats are empty render just message with that info
          this.chat = this.chats[0];
          this.messagesToView = this.chat.messages;
          this.members = this.chat.members;
          this.generateActiveChats(this.chats);
          this.generateUnreadChats(this.chats);
        }
        this.loading = !this.loading;
      })
      .catch(err => {
        this.error = err.response.data;
        this.toastr.error(this.error.error);
      });
    },500);

    this.currentUsername = this.userService.user.username;
  }


  addChat(chat: any) {
    this.chatService.addChat(chat)
    .then(res =>{
      if(res.data.notAddedMembers.length !== 0){
        for (const member of res.data.notAddedMembers){
          this.toastr.warning(member + " not found or is already a member! Chat created..");
        }
      }else {
        this.toastr.success('Chat added successfully');
      }
      //render chats and chat view again with updated data
      this.chatService.getChats()
      .then(res => {
        this.chats = res.data;
        this.chat = this.chats[0];
        this.getChatToView(this.chat);
        this.generateActiveChats(this.chats); //generate new array including added chat
        this.generateUnreadChats(this.chats); //generate new array including unRead chat
      })
      .catch(err => {
        this.error = err.response.data;
        this.toastr.error(this.error.error);
      });
    })
    .catch(err => {
      this.error = err.response.data;
      this.toastr.error(this.error.error);
    })
  }

  getChatToView(chat: any) {
    this.chat = chat;
    this.chatService.getMessages(chat)
    .then(res => {
      this.messagesToView = res.data.messages
      this.members = res.data.members
      //render chats again
      this.chatService.getChats()
      .then(res => {
        this.chats = res.data;
      })
    })
    .catch(err => {
      this.error = err.response.data;
      this.toastr.error(this.error.error);
    });
  }

  generateActiveChats(chats: any[]) {

    for (let i = 0; i < chats.length; i++) {
      if (i === 0){
        this.activeChats[i] = true;
      } else {
        this.activeChats[i] = false;
      }
    }
  }

  setActiveChat(index: number) {

    for (let i = 0; i < this.activeChats.length; i++) {

      if(i === index){
        this.activeChats[i] = true;
      } else {
        this.activeChats[i] = false;
      }
    }
  }

  generateUnreadChats(chats: any[]) {

    for (let i = 0; i < chats.length ; i++) {
      if (chats[i].lastViewed <= chats[i].messages[0].createdAt && chats[i].messages[0].author !== this.userService.user.username) {
        this.unreadChats[i] = true
      } else {
        this.unreadChats[i] = false;
      }
    }
  }

  setUnreadChat(index: number) {

    for (let i = 0; i < this.unreadChats.length; i++) {
      if(i === index && this.unreadChats[i]){
        this.unreadChats[i] = false;
      }
    }
    //when chat is read call change to notifications
    this.chatService.newChats = this.unreadChats.filter(u => u).length;
    this.chatService.chatsChanged.next();
  }

  onSendMessage() {
    if (!this.text){
      this.toastr.error('There is no text to send!')
      return;
    }

    const newMessage = {
      chat: this.chat,
      text: this.text
    }

    this.chatService.addMessage(newMessage)
    .then((res) => {
      this.getChatToView(this.chat);
      this.generateActiveChats(this.chats);
      this.generateUnreadChats(this.chats);
    })
    .catch(err => {
      this.error = err.response.data;
      this.toastr.error(this.error.error);
    })

    this.text ='';
  }

  onAddMember() {
    if (!this.newMembers){
      this.toastr.error('Please enter at least one member');
      return;
    }

    const newChatMembers = {
      newMembers: this.newMembers.split(', '),
      chat: this.chat
    }

    this.chatService.addMembers(newChatMembers)
    .then((res) => {
      //render chat with updated member list
      this.getChatToView(newChatMembers.chat);
      if(res.data.notAddedMembers.length !== 0){
        for (const member of res.data.notAddedMembers){
          this.toastr.warning(member + " not found check the spelling or is already a member!")
        }
      }else {
        for (const member of res.data.addedMembers){
          this.toastr.success(member + " successfully added to the chat!")
        }
      }
    })
    .catch(err => {
      this.error = err.response.data;
      this.toastr.error(this.error.error);
    })
    this.newMembers = "";
  }

  leaveChat(chat: any) {
    const leaveMessage = {
      chat: chat,
      text: "This user left!"
    }

    this.chatService.addMessage(leaveMessage)
    .catch(err => {
      this.error = err.response.data;
      this.toastr.error(this.error.error);
    })


    this.chatService.leaveChat(chat).then( res => {
      this.toastr.success('You have left the chat: ' + chat.subject);
      this.chatService.getChats()
      .then(res => {
        this.chats = res.data;
        if (this.chats.length > 0) {  //if chats are empty render just message with that info
          this.chat = this.chats[0];
          this.messagesToView = this.chat.messages;
          this.members = this.chat.members;
        }
        else {
          this.chat = null;
        }
      })
      .catch(err => {
        this.error = err.response.data;
        this.toastr.error(this.error.error);
      });
    })

  }
}
