import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyoroPage } from './buyoro.page';

describe('BuyoroPage', () => {
  let component: BuyoroPage;
  let fixture: ComponentFixture<BuyoroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyoroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyoroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
