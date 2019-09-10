import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalbuyPage } from './modalbuy.page';

describe('ModalbuyPage', () => {
  let component: ModalbuyPage;
  let fixture: ComponentFixture<ModalbuyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalbuyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalbuyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
