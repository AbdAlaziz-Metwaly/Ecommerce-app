import { TestBed } from '@angular/core/testing';

import { BrsndsService } from './brsnds.service';

describe('BrsndsService', () => {
  let service: BrsndsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrsndsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
