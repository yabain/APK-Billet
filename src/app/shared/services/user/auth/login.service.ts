import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActionStatus } from '../../../utils';
import { YUser } from '../../../entities/users';
import { YEntityID } from '../../../entities';
import { UserPreferenceService } from '../user-preference/user-preference.service';
import { EventEmitterService } from 'src/app/shared/utils/services/event-emitter/event-emitter.service';
import { YUserProfilService } from '../user-profil/yuser-profil.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authService:AuthService,
    private userProfil:YUserProfilService,
    private userPreferenceService:UserPreferenceService,
    private eventService:EventEmitterService,
  ) { }

  loginUser(user:YUser):Promise<ActionStatus<boolean>>
  {
    return new Promise<ActionStatus<boolean>>((resolve,reject)=>{
      this.authService.authLogin(user)
      .then((result:ActionStatus<YEntityID>)=> this.userProfil.getCurrentUserProfil(result.result))
      .then((result)=> this.userPreferenceService.downloadPreferences())
      .then((result:ActionStatus<boolean>)=>{
        this.eventService.loginEvent.next(true);
        resolve(result);
      })
      .catch((error:ActionStatus<boolean>)=>{
        reject(error)
      })
    })
  }

}
