import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserProfilService } from '../user-profil/user-profil.service';
import { EntityID } from '../../entities/entityid';
import { EventService } from '../../utils/services/events/event.service';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user';
import { RestApiClientService } from '../../utils/services/http/client/rest-api-client.service';
import { CRequest } from '../../utils/services/http/client/crequest';
import { CResponse } from '../../utils/services/http/client/cresponse';
import { ActionStatus } from '../../others/actionstatus';
import { FilActualiteService } from '../fil-actualite/fil-actualite.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authService:AuthService,
    private userProfil:UserProfilService,
    private eventService:EventService,
  ) { }

  loginUser(user:User):Promise<ActionStatus<boolean>>
  {
    return new Promise<ActionStatus<boolean>>((resolve,reject)=>{
      this.authService.authLogin(user)
      .then((result:ActionStatus<EntityID>)=> this.userProfil.getCurrentUserProfil(result.result))
      .then((result:ActionStatus<boolean>)=>{
        console.log("endlogine ",result.result)
        this.eventService.loginEvent.next(true);
        resolve(result);
      })
      .catch((error:ActionStatus<boolean>)=>{
        reject(error)
      })
    })
  }

}
