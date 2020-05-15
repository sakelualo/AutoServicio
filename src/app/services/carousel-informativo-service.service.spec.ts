import { TestBed } from '@angular/core/testing';

import { CarouselInformativoServiceService } from './carousel-informativo-service.service';

describe('CarouselInformativoServiceService', () => {
  let service: CarouselInformativoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarouselInformativoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
