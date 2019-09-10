import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacPassPage } from './transac-pass.page';

describe('TransacPassPage', () => {
  let component: TransacPassPage;
  let fixture: ComponentFixture<TransacPassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransacPassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransacPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
