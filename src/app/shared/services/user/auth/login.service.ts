import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActionStatus } from '../../../utils';
import { YUser } from '../../../entities/users';
import { YEntityID } from '../../../entities';
import { UserProfilService } from '../user-profil/user-profil.service';
import { EventService } from 'src/app/shared/utils/services/events/event.service';
import { UserPreferenceService } from '../user-preference/user-preference.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authService:AuthService,
    private userProfil:UserProfilService,
    private userPreferenceService:UserPreferenceService,
    private eventService:EventService,
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
