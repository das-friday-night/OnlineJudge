import { TestBed, inject } from '@angular/core/testing';

import { ProblemListFilterService } from './problem-list-filter.service';

describe('ProblemListFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProblemListFilterService]
    });
  });

  it('should ...', inject([ProblemListFilterService], (service: ProblemListFilterService) => {
    expect(service).toBeTruthy();
  }));
});
