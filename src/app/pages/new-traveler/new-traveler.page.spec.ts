import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTravelerPage } from './new-traveler.page';

describe('NewTravelerPage', () => {
  let component: NewTravelerPage;
  let fixture: ComponentFixture<NewTravelerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTravelerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTravelerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
