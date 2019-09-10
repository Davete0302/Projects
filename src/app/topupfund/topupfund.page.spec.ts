import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupfundPage } from './topupfund.page';

describe('TopupfundPage', () => {
  let component: TopupfundPage;
  let fixture: ComponentFixture<TopupfundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupfundPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupfundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
