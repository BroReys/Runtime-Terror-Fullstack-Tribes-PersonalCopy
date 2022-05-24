import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterKingdomComponent } from './register-kingdom.component';

describe('RegisterKingdomComponent', () => {
  let component: RegisterKingdomComponent;
  let fixture: ComponentFixture<RegisterKingdomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterKingdomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterKingdomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
