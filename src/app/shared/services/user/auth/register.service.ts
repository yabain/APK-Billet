import { Injectable } from '@angular/core';
import { YUser } from 'src/app/shared/entities/users';
import { ActionStatus } from 'src/app/shared/utils';
import { FirebaseError } from 'src/app/shared/utils/services/firebase';
import { YUserStoreService } from '../../store/yuser/yuser-store.service';
import { UserPreferenceService } from '../user-preference/user-preference.service';
import { YUserProfilService } from '../user-profil/yuser-profil.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private authService:AuthService,
    // private eventService:EventService,
    private usersStoreService:YUserStoreService,
    private userProfile:YUserProfilService,
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
        // FirebaseError.handleApiError(error);
        reject(error)
      })
    })
  }
}
