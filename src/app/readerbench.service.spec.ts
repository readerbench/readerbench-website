import { TestBed, inject } from '@angular/core/testing';

import { ReaderBenchService } from './readerbench.service';

describe('ReaderBenchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReaderBenchService]
    });
  });

  it('should be created', inject([ReaderBenchService], (service: ReaderBenchService) => {
    expect(service).toBeTruthy();
  }));
});
