import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TroopTypeComponent } from './troop-type.component';

describe('TroopTypeComponent', () => {
  let component: TroopTypeComponent;
  let fixture: ComponentFixture<TroopTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TroopTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TroopTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
