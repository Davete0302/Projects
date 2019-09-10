import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldOroPage } from './sold-oro.page';

describe('SoldOroPage', () => {
  let component: SoldOroPage;
  let fixture: ComponentFixture<SoldOroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldOroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldOroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
