import { TestBed } from '@angular/core/testing';
import { MessageEntityService } from './message-entity.service';

describe('UserEntityService', () => {
  let service: MessageEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
