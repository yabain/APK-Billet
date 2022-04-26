import { TestBed } from '@angular/core/testing';

import { ProcessBilletPayementService } from './process-billet-payement.service';

describe('ProcessBilletPayementService', () => {
  let service: ProcessBilletPayementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessBilletPayementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
