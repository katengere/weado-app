import { TestBed } from '@angular/core/testing';
import { ActivityEntityService } from './activity-entity.service';

describe('UserEntityService', () => {
  let service: ActivityEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
