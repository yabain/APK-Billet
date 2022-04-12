import { TestBed } from '@angular/core/testing';

import { YEventStoreService } from './yevent-store.service';

describe('YEventStoreService', () => {
  let service: YEventStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YEventStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
