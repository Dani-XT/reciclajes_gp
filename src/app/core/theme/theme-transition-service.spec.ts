import { TestBed } from '@angular/core/testing';

import { ThemeTransitionService } from './theme-transition-service';

describe('ThemeTransitionService', () => {
  let service: ThemeTransitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeTransitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
