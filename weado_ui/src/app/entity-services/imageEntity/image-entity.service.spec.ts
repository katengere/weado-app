import { TestBed } from '@angular/core/testing';
import { ImageEntityService } from './image-entity.service';

describe('UserEntityService', () => {
  let service: ImageEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
