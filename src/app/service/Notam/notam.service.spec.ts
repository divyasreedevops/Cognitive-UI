import { TestBed } from '@angular/core/testing';

import { NotamService } from './notam.service';

describe('NotamService', () => {
  let service: NotamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
