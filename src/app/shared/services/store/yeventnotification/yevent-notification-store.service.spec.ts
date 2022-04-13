import { TestBed } from '@angular/core/testing';

import { YEventNotificationStoreService } from './yevent-notification-store.service';

describe('YEventInvitationStoreService', () => {
  let service: YEventNotificationStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YEventNotificationStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
