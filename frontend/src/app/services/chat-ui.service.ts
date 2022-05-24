import { Injectable } from '@angular/core';
import { Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatUiService {
  private showAddChat: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleAddChat(): void{
    this.showAddChat = !this.showAddChat;
    this.subject.next(this.showAddChat);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
