import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankWithdrawPage } from './bank-withdraw.page';

describe('BankWithdrawPage', () => {
  let component: BankWithdrawPage;
  let fixture: ComponentFixture<BankWithdrawPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankWithdrawPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankWithdrawPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
