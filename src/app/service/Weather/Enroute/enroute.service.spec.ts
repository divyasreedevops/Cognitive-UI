import { TestBed } from '@angular/core/testing';

import { EnrouteService } from './enroute.service';

describe('EnrouteService', () => {
  let service: EnrouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
