import { TestBed } from '@angular/core/testing';

import { TestDosdService } from './test-dosd.service';

describe('TestDosdService', () => {
  let service: TestDosdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestDosdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
