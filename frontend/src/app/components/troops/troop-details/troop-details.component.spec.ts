import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TroopDetailsComponent } from './troop-details.component';

describe('TroopDetailsComponent', () => {
  let component: TroopDetailsComponent;
  let fixture: ComponentFixture<TroopDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TroopDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TroopDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
