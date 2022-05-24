import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsLeaderboardsComponent } from './tabs-leaderboards.component';

describe('TabsLeaderboardsComponent', () => {
  let component: TabsLeaderboardsComponent;
  let fixture: ComponentFixture<TabsLeaderboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsLeaderboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsLeaderboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
