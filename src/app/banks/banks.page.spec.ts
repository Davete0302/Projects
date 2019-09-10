import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksPage } from './banks.page';

describe('BanksPage', () => {
  let component: BanksPage;
  let fixture: ComponentFixture<BanksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
