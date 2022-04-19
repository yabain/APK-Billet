import { TestBed } from '@angular/core/testing';

import { LoaderEventService } from './loader-event.service';

describe('LoaderEventService', () => {
  let service: LoaderEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
