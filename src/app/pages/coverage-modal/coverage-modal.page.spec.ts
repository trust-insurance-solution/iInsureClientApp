import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageModalPage } from './coverage-modal.page';

describe('CoverageModalPage', () => {
  let component: CoverageModalPage;
  let fixture: ComponentFixture<CoverageModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverageModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverageModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
