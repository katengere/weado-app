import { TestBed } from '@angular/core/testing';
import { ReportEntityService } from './report-entity.service';

describe('UserEntityService', () => {
  let service: ReportEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
