import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockscreenPage } from './lockscreen.page';

describe('LockscreenPage', () => {
  let component: LockscreenPage;
  let fixture: ComponentFixture<LockscreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockscreenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
