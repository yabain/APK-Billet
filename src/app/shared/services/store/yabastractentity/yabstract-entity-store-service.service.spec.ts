import { TestBed } from '@angular/core/testing';

import { YAbstractEntityStoreServiceService } from './yabstract-entity-store-service.service';

describe('YAbstractEntityStoreServiceService', () => {
  let service: YAbstractEntityStoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YAbstractEntityStoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
