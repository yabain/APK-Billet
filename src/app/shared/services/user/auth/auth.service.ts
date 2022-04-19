import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { YEntityID } from 'src/app/shared/entities';
import { YUser } from 'src/app/shared/entities/users';
import { ActionStatus } from 'src/app/shared/utils';
import { EventEmitterService } from 'src/app/shared/utils/services/event-emitter/event-emitter.service';
import { FireBaseAuth, FirebaseError } from 'src/app/shared/utils/services/firebase';
import { FirebaseDataBaseApi } from '../../../utils/services/firebase/FirebaseDatabaseApi';
// import { LocalStorageService } from '../localstorage/localstorage.service';



@Injectable()
export class AuthService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private eventService: EventEmitterService,
    public firebaseApi:FirebaseDataBaseApi,
    public firebaseAuth:FireBaseAuth
  ) {
    // this.localStorageService.getSubjectByKey("auth_data").subscribe((userData:any) => {
    //   console.log("userData",userData)
    //   if(userData) {
    //     this.isLoggedIn.next(userData.isLoggedIn);
    //   }
    // });
  }
  
  setAuth(logged:{isLoggedIn:boolean})
  {
    this.isLoggedIn.next(logged.isLoggedIn)
  }

  /*
   * logOut function is used to sign out .
   */
  logOut() {
    // this.localStorageService.clearData();
    this.setAuth({isLoggedIn:false})
    this.eventService.logoutEvent.next(true);
  }

 
  createAccount(user: YUser): Promise<ActionStatus<YUser>> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.createUserApi(user.email.toString(),user.password.toString())
      .then((result: ActionStatus<any>)=>{
        user.id.setId(result.result.uid);
        result.result=user;
        resolve(result)
      })
      .catch((e: ActionStatus<any>)=>{
        FirebaseError.handleApiError(e)
        reject(e)
      })
    });

  }

  // Login into your account
  authLogin(user:YUser): Promise<ActionStatus<YEntityID>> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.signInApi(user.email.toString(),user.password.toString())
      .then((result: ActionStatus<any>) => {
        let userID: YEntityID=new YEntityID();
        userID.setId(result.result.user.uid)
        result.result=userID;
        this.setAuth({isLoggedIn:true});
        resolve(result);
      })
      .catch((error: ActionStatus<any>) => {
        FirebaseError.handleApiError(error)
        reject(error);
      })
    });
  }

}
