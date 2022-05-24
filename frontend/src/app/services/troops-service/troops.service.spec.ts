import { TestBed } from '@angular/core/testing';

import { TroopsService } from './troops.service';

describe('TroopsService', () => {
  let service: TroopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TroopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
