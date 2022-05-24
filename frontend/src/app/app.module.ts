
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TroopTypeComponent} from './components/troops/troop-type/troop-type.component';
import {TabsComponent} from "./components/troops/tabs/tabs.component";
import {TroopListComponent} from './components/troops/troop-list/troop-list.component';
import {BarracksComponent} from './components/troops/barracks/barracks.component';
import {BattleComponent} from './components/battle/battle.component';
import {LoginComponent} from './components/login/login.component';
import {IdentifyComponent} from './components/identify/identify.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSliderModule} from '@angular/material/slider';
import { SliderComponent } from './components/battle/slider/slider.component';
import { ChooseTroopsComponent } from './components/battle/choose-troops/choose-troops.component';
import { TroopsToBattleComponent } from './components/battle/troops-to-battle/troops-to-battle.component';
import { ButtonComponent } from './components/button/button.component';
import { TroopDetailsComponent } from './components/troops/troop-details/troop-details.component';
import { KingdomItemComponent } from './components/kingdom/kingdom-item/kingdom-item.component';
import {KingdomItemImageComponent} from "./components/kingdom/kingdom-item-image/kingdom-item-image.component";
import { PasswordComponent } from './components/login/password/password.component';
import { MapComponent } from './components/battle/map/map.component';
import { CastleComponent } from './components/battle/castle/castle.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DialogComponent } from './components/chat/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ChatComponent } from './components/chat/chat/chat.component';
import {HttpClientModule} from "@angular/common/http";
import { ChatItemComponent } from './components/chat/chat-item/chat-item.component';
import { ChatHeaderComponent } from './components/chat/chat-header/chat-header.component';
import { ChatsComponent } from './components/chat/chats/chats.component';
import { ChatButtonComponent } from './components/chat/chat-button/chat-button.component';
import { AddChatComponent } from './components/chat/add-chat/add-chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { KingdomInfoComponent } from './components/battle/kingdom-info/kingdom-info.component';
import { ToastrModule} from "ngx-toastr";
import { BuildingComponent } from './components/building/building.component';
import { PositionComponent } from './components/building/position/position.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BuildingModalComponent } from './components/building/building-modal/building-modal.component';
import { ProgressbarComponent } from './components/building/progressbar/progressbar.component';
import { CurrentKingdomComponent } from './components/building/current-kingdom/current-kingdom.component';
import { RegisterComponent } from './components/login/register/register.component';
import { KingdomDetailsComponent } from './components/kingdom-details/kingdom-details/kingdom-details.component';
import { KingdomComponent } from './components/kingdom/kingdom.component';
import { TabButtonComponent } from './components/kingdom/tab-button/tab-button.component';
import { BattleReportComponent } from './components/battle-report/battle-report.component';
import { BattleHistoryComponent } from './components/battle-history/battle-history.component';
import { BattleCardComponent } from './components/battle-card/battle-card.component';
import { RegisterKingdomComponent } from './components/login/register-kingdom/register-kingdom.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {ScrollingModule} from "@angular/cdk/scrolling";
import { ChatViewComponent } from './components/chat/chat-view/chat-view.component';
import { ChatMembersComponent } from './components/chat/chat-members/chat-members.component';
import { DefenderFinishedComponent } from './components/battle-report/defender-finished/defender-finished.component';
import { AttackerFinishedComponent } from './components/battle-report/attacker-finished/attacker-finished.component';
import { AttackerUnfinishedComponent } from './components/battle-report/attacker-unfinished/attacker-unfinished.component';
import { DefenderUnfinishedComponent } from './components/battle-report/defender-unfinished/defender-unfinished.component';
import { WithSpyReportComponent } from './components/battle-report/with-spy-report/with-spy-report.component';
import { BuildingCountdownComponent } from './components/building/building-countdown/building-countdown.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { CountdownModule } from 'ngx-countdown';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { KingdomModifyComponent } from './components/kingdom-modify/kingdom-modify.component';
import { KingdomGridComponent } from './components/login/kingdom-grid/kingdom-grid.component';
import { LeaderboardDashboardComponent } from './components/leaderboards/leaderboard-dashboard/leaderboard-dashboard.component';
import { ListKingdomsComponent } from './components/leaderboards/list-kingdoms/list-kingdoms.component';
import { TabsLeaderboardsComponent } from './components/leaderboards/tabs-leaderboards/tabs-leaderboards.component';
import { ListRulersComponent } from './components/leaderboards/list-rulers/list-rulers.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TroopTypeComponent,
    TabsComponent,
    TroopListComponent,
    BarracksComponent,
    BattleComponent,
    LoginComponent,
    IdentifyComponent,
    SpinnerComponent,
    SliderComponent,
    KingdomItemComponent,
    KingdomItemImageComponent,
    ChooseTroopsComponent,
    TroopsToBattleComponent,
    ButtonComponent,
    TroopDetailsComponent,
    PasswordComponent,
    MapComponent,
    CastleComponent,
    LoaderComponent,
    DialogComponent,
    ChatComponent,
    ChatItemComponent,
    ChatHeaderComponent,
    ChatsComponent,
    ChatButtonComponent,
    AddChatComponent,
    KingdomInfoComponent,
    BuildingComponent,
    PositionComponent,
    BuildingModalComponent,
    ProgressbarComponent,
    CurrentKingdomComponent,
    RegisterComponent,
    KingdomDetailsComponent,
    KingdomComponent,
    TabButtonComponent,
    BattleReportComponent,
    BattleHistoryComponent,
    BattleCardComponent,
    NotFoundComponent,
    RegisterKingdomComponent,
    ChatViewComponent,
    ChatMembersComponent,
    DefenderFinishedComponent,
    AttackerFinishedComponent,
    AttackerUnfinishedComponent,
    DefenderUnfinishedComponent,
    WithSpyReportComponent,
    BuildingCountdownComponent,
    KingdomModifyComponent,
    KingdomGridComponent,
    LeaderboardDashboardComponent,
    TabsLeaderboardsComponent,
    ListKingdomsComponent,
    ListRulersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbModule,
    ScrollingModule,
    CountdownModule,
    MatProgressBarModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
