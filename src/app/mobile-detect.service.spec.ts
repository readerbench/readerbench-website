import { TestBed, inject } from '@angular/core/testing';

import { MobileDetectService } from './mobile-detect.service';

describe('MobileDetectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MobileDetectService]
    });
  });

  it('should be created', inject([MobileDetectService], (service: MobileDetectService) => {
    expect(service).toBeTruthy();
  }));
});
