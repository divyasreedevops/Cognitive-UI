import { TestBed } from '@angular/core/testing';

import { ApmService } from './apm.service';

describe('ApmService', () => {
  let service: ApmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
