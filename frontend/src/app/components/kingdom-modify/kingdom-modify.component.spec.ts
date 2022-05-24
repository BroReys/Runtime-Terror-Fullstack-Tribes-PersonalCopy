import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KingdomModifyComponent } from './kingdom-modify.component';

describe('KingdomModifyComponent', () => {
  let component: KingdomModifyComponent;
  let fixture: ComponentFixture<KingdomModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KingdomModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KingdomModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
