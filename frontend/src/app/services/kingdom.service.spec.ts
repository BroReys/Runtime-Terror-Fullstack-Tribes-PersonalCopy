import { TestBed } from '@angular/core/testing';

import { KingdomService } from '../../../../../Runtime-Terror-Fullstack-Tribes/frontend/src/app/services/kingdom.service';

describe('KingdomService', () => {
  let service: KingdomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KingdomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
