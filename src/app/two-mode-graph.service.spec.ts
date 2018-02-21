import { TestBed, inject } from '@angular/core/testing';

import { TwoModeGraphService } from './two-mode-graph.service';

describe('TwoModeGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwoModeGraphService]
    });
  });

  it('should be created', inject([TwoModeGraphService], (service: TwoModeGraphService) => {
    expect(service).toBeTruthy();
  }));
});
