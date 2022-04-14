import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { YLanguageCode, YMoneyCode } from 'src/app/shared/enums';
import { ActionStatus } from 'src/app/shared/utils';
import { DbBranchUser } from 'src/app/shared/utils/builders/db-branch';
import { FirebaseDataBaseApi } from 'src/app/shared/utils/services/firebase';
import { UserProfilService } from '../user-profil/user-profil.service';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {
  moneyCode:BehaviorSubject<YMoneyCode>=new BehaviorSubject<YMoneyCode>(YMoneyCode.XAF);
  langCode:BehaviorSubject<YLanguageCode>=new BehaviorSubject<YLanguageCode>(YLanguageCode.FR);

  constructor(
    private firebaseApi:FirebaseDataBaseApi,
    private userProfileService:UserProfilService
  ) { }
  
  //set preference to objet and emmit to app
  private setPreferences(langCode:YLanguageCode,moneyCode:YMoneyCode)
  {
    this.langCode.next(langCode);
    this.moneyCode.next(moneyCode);
  }

  //donwload previous user preferences from firebase
  downloadPreferences():Promise<ActionStatus<void>>
  {
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
        this.firebaseApi.set(
          DbBranchUser.getBranchOfPreferenceUser(this.userProfileService.currentUser.getValue().id),
          {
            moneyCode:this.moneyCode,
            langCode:this.langCode
          }
        )
        .then((result)=> resolve(new ActionStatus()))
        .catch((error)=>{
          this.firebaseApi.handleApiError(error);
          reject(error);
        })
    })
  }

  //read all preferences from default value of device
  initPreference():Promise<ActionStatus<void>>
  {
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      this.readDefaultLangFromDevice()
      this.readDefaultMoneyFromDevice()
      this.updatePreferences(this.langCode.getValue(),this.moneyCode.getValue())
    })
  }

  //set all prefrence to preference device object and update firebase
  updatePreferences(langCode:YLanguageCode,moneyCode:YMoneyCode):Promise<ActionStatus<void>>
  {
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      this.setPreferencesToDevice(langCode,moneyCode);
    })
  }

  //set lang to preference device object and update firebase
  updateLang(langCode:YLanguageCode):Promise<ActionStatus<void>>
  {
    return this.updatePreferences(langCode,this.moneyCode.getValue())
  }

  //set money to preference device object and update firebase
  updateMoney(moneyCode:YMoneyCode):Promise<ActionStatus<void>>
  {
    return this.updatePreferences(this.langCode.getValue(),moneyCode)
  }

  //set 
  private setLangToDevice(langCode:YLanguageCode)
  {
    return this.setPreferencesToDevice(langCode,this.moneyCode.getValue());
  }

  private setMoneyToDevice(moneCode:YMoneyCode)
  {
    return this.setPreferencesToDevice(this.langCode.getValue(),moneCode)
  }

  private setPreferencesToDevice(langCode:YLanguageCode,moneyCode:YMoneyCode)
  {

  }

  getPreferencesFromDevice()
  {

  }

  readDefaultLangFromDevice()
  {

  }

  readDefaultMoneyFromDevice()
  {

  }

}
