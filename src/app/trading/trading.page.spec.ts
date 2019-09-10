import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingPage } from './trading.page';

describe('TradingPage', () => {
  let component: TradingPage;
  let fixture: ComponentFixture<TradingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
