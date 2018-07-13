import { TestBed, inject } from '@angular/core/testing';

import { ApiUploadService } from './api-upload.service';

describe('ApiUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUploadService]
    });
  });

  it('should be created', inject([ApiUploadService], (service: ApiUploadService) => {
    expect(service).toBeTruthy();
  }));
});
