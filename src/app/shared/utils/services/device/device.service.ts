import { Injectable } from '@angular/core';
import { Device, GetLanguageCodeResult } from '@capacitor/device';
import { YLanguageCode, YMoneyCode } from 'src/app/shared/enums';
import { ActionStatus } from '../../actionstatus';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private globalization:Globalization
  ) { }
  
  getLanguageCode():Promise<ActionStatus<YLanguageCode>>
  {
    let result = new ActionStatus<YLanguageCode>()
    return new Promise<ActionStatus<YLanguageCode>>((resolve,reject)=>{
      Device.getLanguageCode()
      .then((value:GetLanguageCodeResult)=>{
        console.log("Valuue Language Code ",value)
        switch(value.value)
        {
          case YLanguageCode.EN:
            result.result=YLanguageCode.EN
            break;
          default:
            result.result=YLanguageCode.FR;
            break;
        }
        resolve(result)
      })
      .catch((error)=>{
        result.apiCode=ActionStatus.UNKNOW_ERROR;
        result.message=error;
        reject(error);
      })
    })
  }

  getCurrencyCode():Promise<ActionStatus<YMoneyCode>>
  {
    return new Promise<ActionStatus<YMoneyCode>>((resolve,reject)=>{
      // this.globalization.getCurrencyPattern()
      // .then()
      let result= new ActionStatus<YMoneyCode>()
      result.result=YMoneyCode.XAF;
      resolve(result);
    })
  }
}
