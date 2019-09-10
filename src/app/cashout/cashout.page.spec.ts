import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashoutPage } from './cashout.page';

describe('CashoutPage', () => {
  let component: CashoutPage;
  let fixture: ComponentFixture<CashoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashoutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
