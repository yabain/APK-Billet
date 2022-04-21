import { TestBed } from '@angular/core/testing';

import { YArtisteStoreService } from './yartiste-store.service';

describe('YBilletStoreService', () => {
  let service: YArtisteStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YArtisteStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
