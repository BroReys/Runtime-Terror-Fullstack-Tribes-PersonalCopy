import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KingdomComponent } from './kingdom.component';

describe('NewKingdomComponent', () => {
  let component: KingdomComponent;
  let fixture: ComponentFixture<KingdomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KingdomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KingdomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
