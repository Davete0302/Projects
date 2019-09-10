import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendoroPage } from './sendoro.page';

describe('SendoroPage', () => {
  let component: SendoroPage;
  let fixture: ComponentFixture<SendoroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendoroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendoroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
