import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferfundPage } from './transferfund.page';

describe('TransferfundPage', () => {
  let component: TransferfundPage;
  let fixture: ComponentFixture<TransferfundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferfundPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferfundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
