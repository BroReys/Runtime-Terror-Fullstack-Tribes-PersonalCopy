import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KingdomItemComponent } from './kingdom-item.component';

describe('KingdomDetailsComponent', () => {
  let component: KingdomItemComponent;
  let fixture: ComponentFixture<KingdomItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KingdomItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KingdomItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
