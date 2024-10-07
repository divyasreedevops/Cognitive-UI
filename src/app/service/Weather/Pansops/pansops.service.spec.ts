import { TestBed } from '@angular/core/testing';

import { PansopsService } from './pansops.service';

describe('PansopsService', () => {
  let service: PansopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PansopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
