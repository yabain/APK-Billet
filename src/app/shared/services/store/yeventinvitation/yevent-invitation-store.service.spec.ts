import { TestBed } from '@angular/core/testing';

import { YEventInvitationStoreService } from './yevent-invitation-store.service';

describe('YEventInvitationStoreService', () => {
  let service: YEventInvitationStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YEventInvitationStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
