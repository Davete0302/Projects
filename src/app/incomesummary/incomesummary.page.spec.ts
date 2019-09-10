import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesummaryPage } from './incomesummary.page';

describe('IncomesummaryPage', () => {
  let component: IncomesummaryPage;
  let fixture: ComponentFixture<IncomesummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomesummaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomesummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
