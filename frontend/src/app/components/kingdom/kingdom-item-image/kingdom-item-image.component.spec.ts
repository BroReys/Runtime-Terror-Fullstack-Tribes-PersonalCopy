import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KingdomItemImageComponent } from './kingdom-item-image.component';

describe('KingdomDetailsImageComponent', () => {
  let component: KingdomItemImageComponent;
  let fixture: ComponentFixture<KingdomItemImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KingdomItemImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KingdomItemImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
