import { TestBed } from '@angular/core/testing';

import { QuestionableService } from './questionable';

describe('Questionable', () => {
  let service: QuestionableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
