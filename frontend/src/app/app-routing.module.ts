import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BattleComponent} from "./components/battle/battle.component";
import {BarracksComponent} from "./components/troops/barracks/barracks.component";
import {LoginComponent} from "./components/login/login.component";
import {IdentifyComponent} from "./components/identify/identify.component";
import { ChatComponent } from './components/chat/chat/chat.component';
import {PasswordComponent} from "./components/login/password/password.component";
import {BuildingComponent} from "./components/building/building.component";
import {KingdomDetailsComponent} from "./components/kingdom-details/kingdom-details/kingdom-details.component";
import {KingdomComponent} from "./components/kingdom/kingdom.component";
import {RegisterComponent} from "./components/login/register/register.component";
import {BattleHistoryComponent} from "./components/battle-history/battle-history.component";
import { NotFoundComponent } from './components/not-found/not-found.component';
import {KingdomModifyComponent} from "./components/kingdom-modify/kingdom-modify.component";
import {
  LeaderboardDashboardComponent
} from "./components/leaderboards/leaderboard-dashboard/leaderboard-dashboard.component";



const routes: Routes = [
  {path: 'battles', component: BattleComponent},
  {path: 'barracks', component: BarracksComponent},
  {path: 'login', component: LoginComponent},
  {path: 'identify', component : IdentifyComponent},
  {path: 'kingdoms', component: KingdomComponent},
  {path: 'kingdoms/:id', component: KingdomDetailsComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'password', component: PasswordComponent},
  {path: 'password/:token', component: PasswordComponent},
  {path: 'buildings', component: BuildingComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register/:token', component: RegisterComponent},
  {path: 'battles-details', component: BattleHistoryComponent},
  {path: '404', component: NotFoundComponent},
  {path: '', component: KingdomComponent},
  {path: 'modify-kingdom/:id', component: KingdomModifyComponent},
  {path: 'leaderboards', component: LeaderboardDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
