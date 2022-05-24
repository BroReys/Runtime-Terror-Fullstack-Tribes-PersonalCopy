import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentKingdomComponent } from './current-kingdom.component';

describe('CurrentKingdomComponent', () => {
  let component: CurrentKingdomComponent;
  let fixture: ComponentFixture<CurrentKingdomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentKingdomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentKingdomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
