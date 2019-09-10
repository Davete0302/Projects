import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepinPage } from './changepin.page';

describe('ChangepinPage', () => {
  let component: ChangepinPage;
  let fixture: ComponentFixture<ChangepinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
