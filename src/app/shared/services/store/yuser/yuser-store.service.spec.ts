import { TestBed } from '@angular/core/testing';

import { YUserStoreService } from './yuser-store.service';

describe('YUserStoreService', () => {
  let service: YUserStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YUserStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
