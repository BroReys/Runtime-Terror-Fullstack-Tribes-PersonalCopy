import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KingdomGridComponent } from './kingdom-grid.component';

describe('KingdomGridComponent', () => {
  let component: KingdomGridComponent;
  let fixture: ComponentFixture<KingdomGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KingdomGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KingdomGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
