import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoreportPage } from './noreport.page';

describe('NoreportPage', () => {
  let component: NoreportPage;
  let fixture: ComponentFixture<NoreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoreportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
