import {AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../services/user.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DialogComponent } from '../chat/dialog/dialog.component';
import {ScrollStrategyOptions} from "@angular/cdk/overlay";
import { KingdomService } from 'src/app/services/kingdom.service';
import {ChatService} from "../../services/chat.service";
import {KingdomDataService} from "../../services/kingdom-data.service";
import {Observable, of, filter, tap, Subject, takeUntil} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() width = window.innerWidth;
  @Input() hiddenNavbar = false;
  kingdoms: any[] = [];
  kingdomId$: Observable<number>;
  faBars = faBars;
  newChats!: number;
  subscription: any;

  destroy$ = new Subject<void>();

  constructor(public userService: UserService,
              public kingdomService: KingdomService,
              private dialog: MatDialog,
              private chatService: ChatService,
              private router: Router,
              private kingdomDataService: KingdomDataService) {
    this.kingdomId$ = this.kingdomDataService.data$;}


 async ngOnInit() {
    this.userService.userBS.pipe(filter(user => !!user), tap((user) => {
      console.log(user);
      if (!this.hiddenNavbar) {
        this.kingdomService.getKingdoms()
        .then(res => {
          this.kingdoms = res.data;
        })
      }
    }), takeUntil(this.destroy$)).subscribe();

    //subscribed to the subject(rxjs EventEmitter like object) to render notification on change
    this.subscription = this.chatService.chatsChanged.subscribe(
      () => {
        this.newChats = this.chatService.newChats;
      }
    )
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = window.innerWidth;
  }

  onClick() {
    this.hiddenNavbar = !this.hiddenNavbar;
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(DialogComponent,dialogConfig);
  }

  setActiveKingdom(event: any) {
    this.kingdomDataService.changeData(+event.target.value);
    window.sessionStorage.setItem('activeKingdomId', event.target.value);
    let url = this.router.url;
    console.log(this.router.url);

    this.router.navigateByUrl('/404', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    })
  }

  ngOnDestroy() {
    this.destroy$.complete();
    this.subscription.unsubscribe();
  }
}
