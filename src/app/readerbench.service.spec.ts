import { TestBed, inject } from '@angular/core/testing';

import { ReaderbenchService } from './readerbench.service';

describe('ReaderbenchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReaderbenchService]
    });
  });

  it('should be created', inject([ReaderbenchService], (service: ReaderbenchService) => {
    expect(service).toBeTruthy();
  }));
});
