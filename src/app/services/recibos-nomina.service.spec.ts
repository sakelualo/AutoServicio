import { TestBed } from '@angular/core/testing';

import { RecibosNominaService } from './recibos-nomina.service';

describe('RecibosNominaService', () => {
  let service: RecibosNominaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecibosNominaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
