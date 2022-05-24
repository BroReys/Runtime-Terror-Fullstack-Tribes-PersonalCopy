import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingCountdownComponent } from './building-countdown.component';

describe('BuildingCountdownComponent', () => {
  let component: BuildingCountdownComponent;
  let fixture: ComponentFixture<BuildingCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingCountdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
