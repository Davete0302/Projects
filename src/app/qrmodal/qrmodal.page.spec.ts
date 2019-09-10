import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrmodalPage } from './qrmodal.page';

describe('QrmodalPage', () => {
  let component: QrmodalPage;
  let fixture: ComponentFixture<QrmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrmodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
