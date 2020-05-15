import { TestBed } from '@angular/core/testing';

import { HistoriallaboralService } from './historiallaboral.service';

describe('HistoriallaboralService', () => {
  let service: HistoriallaboralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriallaboralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
