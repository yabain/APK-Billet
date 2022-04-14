import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { YEntityID } from 'src/app/shared/entities';
import { YUser } from 'src/app/shared/entities/users';
import { ActionStatus } from 'src/app/shared/utils';
import { EventService } from 'src/app/shared/utils/services/events/event.service';
import { FirebaseDataBaseApi } from '../../../utils/services/firebase/FirebaseDatabaseApi';
// import { LocalStorageService } from '../localstorage/localstorage.service';



@Injectable()
export class AuthService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private eventService: EventService,
    public firebaseApi:FirebaseDataBaseApi
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
      this.firebaseApi.createUserApi(user.email.toString(),user.password.toString())
      .then((result: ActionStatus<any>)=>{
        user.createdDate=(new Date()).toISOString()
        user.id.setId(result.result.uid);
        result.result=user;
        resolve(result)
      })
      .catch((e: ActionStatus<any>)=>{
        this.firebaseApi.handleApiError(e)
        reject(e)
      })
    });

  }

  // Login into your account
  authLogin(user:YUser): Promise<ActionStatus<YEntityID>> {
    return new Promise((resolve, reject) => {
      this.firebaseApi.signInApi(user.email.toString(),user.password.toString())
      .then((result: ActionStatus<any>) => {
        let userID: YEntityID=new YEntityID();
        userID.setId(result.result.user.uid)
        result.result=userID;
        this.setAuth({isLoggedIn:true});
        resolve(result);
      })
      .catch((error: ActionStatus<any>) => {
        this.firebaseApi.handleApiError(error)
        reject(error);
      })
    });
  }

}
