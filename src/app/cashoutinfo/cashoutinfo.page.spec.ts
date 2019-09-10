import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashoutinfoPage } from './cashoutinfo.page';

describe('CashoutinfoPage', () => {
  let component: CashoutinfoPage;
  let fixture: ComponentFixture<CashoutinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashoutinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashoutinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
