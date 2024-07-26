import { TestBed } from '@angular/core/testing';
import { ProjectEntityService } from './project-entity.service';

describe('UserEntityService', () => {
  let service: ProjectEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
