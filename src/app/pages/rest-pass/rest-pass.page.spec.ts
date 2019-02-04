import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestPassPage } from './rest-pass.page';

describe('RestPassPage', () => {
  let component: RestPassPage;
  let fixture: ComponentFixture<RestPassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestPassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
