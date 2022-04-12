import { TestBed } from '@angular/core/testing';

import { YEventPlaceStoreService } from './yevent-place-store.service';

describe('YEventPlaceStoreService', () => {
  let service: YEventPlaceStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YEventPlaceStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
