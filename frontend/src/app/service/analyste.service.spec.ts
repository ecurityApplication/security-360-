import { TestBed } from '@angular/core/testing';

import { AnalysteService } from './analyste.service';

describe('AnalysteService', () => {
  let service: AnalysteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
