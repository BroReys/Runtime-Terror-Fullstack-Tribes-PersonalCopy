import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKingdomsComponent } from './list-kingdoms.component';

describe('ListKingdomsComponent', () => {
  let component: ListKingdomsComponent;
  let fixture: ComponentFixture<ListKingdomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListKingdomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKingdomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
