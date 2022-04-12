import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { EntityID } from '../../entities/entityid';
import { User } from '../../entities/user';
import { ActionStatus } from '../../others/actionstatus';
import { EventService } from '../../utils/services/events/event.service';
import { FirebaseDataBaseApi } from '../../utils/services/firebase/FirebaseDatabaseApi';
import { CRequest } from '../../utils/services/http/client/crequest';
import { CResponse } from '../../utils/services/http/client/cresponse';
import { RestApiClientService } from '../../utils/services/http/client/rest-api-client.service';
import { LocalStorageService } from '../localstorage/localstorage.service';



@Injectable()
export class AuthService {
  isAuth: boolean = true;
  isAdmin: boolean = true;

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private localStorageService: LocalStorageService,
    private eventService: EventService,
    private firebaseApi:FirebaseDataBaseApi
  ) {
    this.localStorageService.getSubjectByKey("auth_data").subscribe((userData:any) => {
      console.log("userData",userData)
      if(userData) {
        this.isLoggedIn.next(userData.isLoggedIn);
      }
    });


  }
  setAuth(logged:{isLoggedIn:boolean})
  {
    this.localStorageService.setData("auth_data",logged);    
    this.isLoggedIn.next(logged.isLoggedIn)
  }

  /*
   * logOut function is used to sign out .
   */
  logOut() {
    // this.setAuth({isLoggedIn:false})
    this.localStorageService.clearData();
    this.eventService.logoutEvent.next(true);
  }

  /**
   *  Create an account on the drupal platform
   *
   */
  createAccount(user: User): Promise<ActionStatus<User>> {
    // console.log(user)
    return new Promise((resolve, reject) => {
      this.firebaseApi.createUserApi(user.email.toString(),user.password.toString())
      .then((result: ActionStatus<any>)=>{
        user.dateCreated=(new Date()).toISOString()
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
  authLogin(user:User): Promise<ActionStatus<EntityID>> {
    return new Promise((resolve, reject) => {
      this.firebaseApi.signInApi(user.email.toString(),user.password.toString())
      .then((result: ActionStatus<any>) => {
        let userID: EntityID=new EntityID();
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

  setUserToLocalStorage(){
    

  }
}
