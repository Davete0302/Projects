import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacPass1Page } from './transac-pass1.page';

describe('TransacPass1Page', () => {
  let component: TransacPass1Page;
  let fixture: ComponentFixture<TransacPass1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransacPass1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransacPass1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
