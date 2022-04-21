import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { YEntityID } from 'src/app/shared/entities';
import { YUser } from 'src/app/shared/entities/users';
import { ActionStatus } from 'src/app/shared/utils';
import { EventEmitterService } from 'src/app/shared/utils/services/event-emitter/event-emitter.service';
import { YUserStoreService } from '../../store/yuser/yuser-store.service';



@Injectable({
  providedIn: 'root'
})
export class YUserProfilService {
  currentUser: BehaviorSubject<YUser> = new BehaviorSubject<YUser>(new YUser());

  constructor(
    // private localStorageService:LocalStorageService,
    private userService:YUserStoreService,
    private eventService:EventEmitterService
    ) {

    // this.localStorageService.getSubjectByKey("user_profil").subscribe((userObj:any)=>{
    //   if(userObj){
    //     console.log("userprofil ",userObj)
    //     this.currentUser.next(userBuilder(userObj))
    //   }
    // })
    this.eventService.logoutEvent.subscribe((value)=>{
      if(value)
      {
        this.currentUser.next(new YUser())
      }
    })
  }
  setUser(user:YUser):void
  {
    // this.localStorageService.setData("user_profil",user.toString());
    this.currentUser.next(user)
  }
    /*
   * resetPassword is used to reset your password.
   */
    resetPassword() {
      // this.toastr.success('Email Sent');
      // this.router.navigate(['/login']);
    }
    getCurrentUserProfil(userID:YEntityID):Promise<ActionStatus<YUser>>
    {
      return new Promise<ActionStatus<YUser>>((resolve,reject)=>{
        this.userService.getUserById(userID)
        .then((result:ActionStatus<YUser>)=>{
          this.setUser(result.result);
          resolve(result);
        })
        .catch((error:ActionStatus<YUser>)=>reject(error))
      })
    }

    resetDataUser(user:YUser)
    {
      
    }

    saveUserProfil(user:YUser):Promise<ActionStatus<YUser>>
    {
      return new Promise<ActionStatus<YUser>>((resolve,reject)=>{
        this.userService.updateUser(user).then((result)=>{
          this.setUser(user);
          resolve(result)
        })
        .catch((error)=>reject(error))
      })
    }
}
