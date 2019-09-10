import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendmenuPage } from './sendmenu.page';

describe('SendmenuPage', () => {
  let component: SendmenuPage;
  let fixture: ComponentFixture<SendmenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendmenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendmenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
