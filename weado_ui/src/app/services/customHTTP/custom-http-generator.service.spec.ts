import { TestBed } from '@angular/core/testing';

import { CustomHttpGeneratorService } from './custom-http-generator.service';

describe('CustomHttpGeneratorService', () => {
  let service: CustomHttpGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomHttpGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
