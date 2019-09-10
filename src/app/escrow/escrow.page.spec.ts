import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowPage } from './escrow.page';

describe('EscrowPage', () => {
  let component: EscrowPage;
  let fixture: ComponentFixture<EscrowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
