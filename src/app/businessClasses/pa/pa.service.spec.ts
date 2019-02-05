import { TestBed } from '@angular/core/testing';

import { PaService } from './pa.service';

describe('PaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaService = TestBed.get(PaService);
    expect(service).toBeTruthy();
  });
});
