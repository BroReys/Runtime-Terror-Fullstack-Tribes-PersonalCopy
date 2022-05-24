import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardDashboardComponent } from './leaderboard-dashboard.component';

describe('LeaderboardDashboardComponent', () => {
  let component: LeaderboardDashboardComponent;
  let fixture: ComponentFixture<LeaderboardDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
