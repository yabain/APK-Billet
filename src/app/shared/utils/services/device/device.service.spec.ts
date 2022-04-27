import { TestBed } from '@angular/core/testing';
import { YLanguageCode } from 'src/app/shared/enums';

import { DeviceService } from './device.service';

describe('DeviceService', () => {
  let service: DeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceService);
  });

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });

  it("#getLanguageCode should return language code",async ()=>{
    let languageCode = await service.getLanguageCode();
    let languages = [YLanguageCode.EN,YLanguageCode.FR];
    expect(languages).toContain(languageCode.result)
  })

  it("#getCurrencyCode should return currency code", async ()=>{
    let currency = await service.getCurrencyCode();
    expect(currency.result).toBeDefined()
  })
});
