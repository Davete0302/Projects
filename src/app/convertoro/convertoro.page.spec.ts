import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertoroPage } from './convertoro.page';

describe('ConvertoroPage', () => {
  let component: ConvertoroPage;
  let fixture: ComponentFixture<ConvertoroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertoroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertoroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
