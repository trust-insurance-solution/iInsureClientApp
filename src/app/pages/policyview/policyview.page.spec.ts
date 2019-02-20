import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyviewPage } from './policyview.page';

describe('PolicyviewPage', () => {
  let component: PolicyviewPage;
  let fixture: ComponentFixture<PolicyviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
