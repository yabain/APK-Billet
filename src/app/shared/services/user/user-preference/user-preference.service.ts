import { Injectable } from '@angular/core';
import { AppPreferences } from '@awesome-cordova-plugins/app-preferences';
import { BehaviorSubject } from 'rxjs';
import { YLanguageCode, YMoneyCode } from 'src/app/shared/enums';
import { ActionStatus } from 'src/app/shared/utils';
import { DbBranchUser } from 'src/app/shared/utils/builders/db-branch';
import { DeviceService } from 'src/app/shared/utils/services/device/device.service';
import { FirebaseDataBaseApi, FirebaseError } from 'src/app/shared/utils/services/firebase';
import { YUserProfilService } from '../user-profil/yuser-profil.service';


@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {
  moneyCode:BehaviorSubject<YMoneyCode>=new BehaviorSubject<YMoneyCode>(YMoneyCode.XAF);
  langCode:BehaviorSubject<YLanguageCode>=new BehaviorSubject<YLanguageCode>(YLanguageCode.FR);
  private deviceDict="yabi-dict-preferences";
  private deviceDictLang="yabi-pref-lang";
  private deviceDictMoney="yabi-pref-money";
  private devicePreferences =  AppPreferences;
  constructor(
    private firebaseApi:FirebaseDataBaseApi,
    private userProfileService:YUserProfilService,
    private deviceService:DeviceService
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
       this.firebaseApi.fetch(DbBranchUser.getBranchOfUserPreference(this.userProfileService.currentUser.getValue().id))
       .then((value)=>{
          this.setPreferences(value.result.langCode,value.result.moneyCode) 
          return this.setPreferencesToDevice(value.result.langCode,value.result.moneyCode);
       })
       .then((result)=> resolve(result))
       .catch((error)=>{
         FirebaseError.handleApiError(error);
         reject(error)
       })
    })
  }

  //read all preferences from default value of device
  initPreference():Promise<ActionStatus<void>>
  {
    let lang:YLanguageCode;
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      this.readDefaultLangFromDevice()
      .then((result)=>{
        lang=result.result;
        return this.readDefaultMoneyFromDevice()
      })
      .then((result)=>{
        this.setPreferences(lang,result.result)
        return this.setPreferencesToDevice(lang,result.result)
      })
      .then((result)=>this.updatePreferences(this.langCode.getValue(),this.moneyCode.getValue()))
      .then((result)=> resolve(result))
      .catch((error)=>reject(error))    
    })
  }

  //set all prefrence to preference device object and update firebase
  updatePreferences(langCode:YLanguageCode,moneyCode:YMoneyCode):Promise<ActionStatus<void>>
  {
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      this.firebaseApi.set(
        DbBranchUser.getBranchOfUserPreference(this.userProfileService.currentUser.getValue().id),
        {
          moneyCode:this.moneyCode,
          langCode:this.langCode
        }
      )
      .then((result)=> {
        this.setPreferencesToDevice(langCode,moneyCode);
        resolve(new ActionStatus())
      })
      .catch((error)=>{
        FirebaseError.handleApiError(error);
        reject(error);
      })
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
  private setLangToDevice(langCode:YLanguageCode):Promise<ActionStatus<void>>
  {
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      this.devicePreferences.store(this.deviceDict,this.deviceDictLang,langCode)
      .then((result)=>{
        resolve(new ActionStatus())
      })
      .catch((error)=>reject(new ActionStatus()))
    })
    
  }

  private setMoneyToDevice(moneCode:YMoneyCode):Promise<ActionStatus<void>>
  {
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      this.devicePreferences.store(this.deviceDict,this.deviceDictMoney,moneCode)
      .then((result)=>{
        resolve(new ActionStatus())
      })
      .catch((error)=>reject(new ActionStatus()))
    })
  }

  private setPreferencesToDevice(langCode:YLanguageCode,moneyCode:YMoneyCode)
  {
    return this.setLangToDevice(langCode).then((value)=>this.setMoneyToDevice(moneyCode));
  }

  getPreferencesFromDevice()
  {
    return this.readDefaultLangFromDevice()
    .then((result)=>{
      this.readDefaultMoneyFromDevice()
    })
  }

  readDefaultLangFromDevice():Promise<ActionStatus<YLanguageCode>>
  {
    return this.deviceService.getLanguageCode()
  }

  readDefaultMoneyFromDevice()
  {
    return this.deviceService.getCurrencyCode()
  }

}
