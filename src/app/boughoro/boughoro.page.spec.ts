import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughoroPage } from './boughoro.page';

describe('BoughoroPage', () => {
  let component: BoughoroPage;
  let fixture: ComponentFixture<BoughoroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoughoroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoughoroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
