import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRulersComponent } from './list-rulers.component';

describe('ListRulersComponent', () => {
  let component: ListRulersComponent;
  let fixture: ComponentFixture<ListRulersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRulersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRulersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
