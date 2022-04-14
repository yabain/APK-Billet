import { Injectable } from '@angular/core';
import { YUser } from 'src/app/shared/entities/users';
import { ActionStatus } from 'src/app/shared/utils';
import { EventService } from 'src/app/shared/utils/services/events/event.service';
import { YUserStoreService } from '../../store/yuser/yuser-store.service';
import { UserPreferenceService } from '../user-preference/user-preference.service';
import { UserProfilService } from '../user-profil/user-profil.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private authService:AuthService,
    private eventService:EventService,
    private usersStoreService:YUserStoreService,
    private userProfile:UserProfilService,
    private userPreference:UserPreferenceService
    
  ) { }

  register(user:YUser):Promise<ActionStatus<void>>
  {
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      this.authService.createAccount(user)
      .then((result)=>this.authService.authLogin(user))
      .then((result)=>this.usersStoreService.createNewAccount(user))
      .then((result)=>{
        this.userProfile.setUser(user);
        return this.userPreference.initPreference()
      })
      .then((result)=>resolve(result))
      .catch((error)=>{
        this.authService.firebaseApi.handleApiError(error);
        reject(error)
      })
    })
  }
}
