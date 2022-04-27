import { TestBed } from "@angular/core/testing"
import { YLanguageCode, YMoneyCode } from "src/app/shared/enums";
import { UserPreferenceService } from "./user-preference.service"

describe('User Preference Service',()=>{
    let userPreferenceService:UserPreferenceService;
    beforeEach(()=>{
        userPreferenceService=TestBed.inject(UserPreferenceService);
    })
    
    it("write user preference to device",async ()=>{
        let result = userPreferenceService.setPreferencesToDevice(YLanguageCode.FR,YMoneyCode.XAF)
        await expectAsync(result).toBeResolved();
    })
})