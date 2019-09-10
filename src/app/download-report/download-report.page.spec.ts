import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadReportPage } from './download-report.page';

describe('DownloadReportPage', () => {
  let component: DownloadReportPage;
  let fixture: ComponentFixture<DownloadReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
