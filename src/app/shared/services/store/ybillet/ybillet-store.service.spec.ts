import { TestBed } from '@angular/core/testing';

import { YBilletStoreService } from './ybillet-store.service';

describe('YBilletStoreService', () => {
  let service: YBilletStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YBilletStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
