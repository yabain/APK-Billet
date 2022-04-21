import { TestBed } from '@angular/core/testing';

import { YOrganizerStoreService } from './yorganizer-store.service';

describe('YBilletStoreService', () => {
  let service: YOrganizerStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YOrganizerStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
