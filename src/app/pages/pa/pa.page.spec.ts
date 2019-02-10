import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaPage } from './pa.page';

describe('PaPage', () => {
  let component: PaPage;
  let fixture: ComponentFixture<PaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
