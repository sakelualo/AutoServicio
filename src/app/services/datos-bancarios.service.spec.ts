import { TestBed } from '@angular/core/testing';

import { DatosBancariosService } from './datos-bancarios.service';

describe('DatosBancariosService', () => {
  let service: DatosBancariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosBancariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
