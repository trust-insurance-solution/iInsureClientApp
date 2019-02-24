import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesspaymentPage } from './successpayment.page';

describe('SuccesspaymentPage', () => {
  let component: SuccesspaymentPage;
  let fixture: ComponentFixture<SuccesspaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccesspaymentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesspaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
