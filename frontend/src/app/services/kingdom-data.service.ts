import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class KingdomDataService {
  private currentData = new BehaviorSubject<number>(0);
  data$ = this.currentData.asObservable();

  constructor() {
    this.changeData(Number(window.sessionStorage.getItem('activeKingdomId')));
  }

  changeData(data: number): void {
    this.currentData.next(data);
  }
}
