import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapPage } from './gmap.page';

describe('GmapPage', () => {
  let component: GmapPage;
  let fixture: ComponentFixture<GmapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
