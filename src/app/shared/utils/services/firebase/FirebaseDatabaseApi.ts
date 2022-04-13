import { Injectable, isDevMode } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { ActionStatus } from '../../actionstatus';
import { FirebaseConfig } from './firebase-config';

import { FireBaseConstant } from './firebase-constant';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataBaseApi {
  

  static firebaseConfig: any = {};
  debug: boolean = false;
  offlineMode: boolean = false;
  db: any;

  constructor() {
    console.log("firebase classe")
    if (isDevMode()) {
      console.log('Dev Mode');
      FirebaseDataBaseApi.firebaseConfig = FirebaseConfig.devDB
    } else {
      console.log('Prod Mode');
      FirebaseDataBaseApi.firebaseConfig = FirebaseConfig.prodDB
    }

    // Initialize Firebase
    firebase.initializeApp(FirebaseDataBaseApi.firebaseConfig);
    // firebase.analytics();
    this.db = firebase.database();
    this.setDebugMode();
    this.setModeApp();
  }
  setDebugMode() {
    // if(this.debug) firebase.firestore.setLogLevel('debug');

  }
  setModeApp() {
    // if(this.offlineMode) firebase.firestore().enablePersistence();
  }
  getFirebaseDatabase() {
    return this.db;
  }
  getFirebaseFile()
  {
    return firebase.storage()
  }

  add(url: string, value: any): Promise<ActionStatus<any>> {
    let action = new ActionStatus<any>();
    return new Promise((resolve, reject) => {
      this.db.ref(url).push().set(value).then((doc) => {
        action.description = 'successful add new collection';
        resolve(action);
      }).catch((err) => {
        // Bugsnag.notify(err)
        action.apiCode = err.code;
        action.code = ActionStatus.UNKNOW_ERROR;
        action.message = 'error';
        action.description = '' + err;
        reject(action);
      });
    });
  }

  set(url: string, value: any): Promise<ActionStatus<any>> {
    let action = new ActionStatus<any>();
    return new Promise<ActionStatus<any>>((resolve, reject) => {
      this.db.ref(url).set(value).then(() => {
        action.message = 'success';
        action.description = 'successful set new collection';
        resolve(action);
      }).catch((err) => {
        // Bugsnag.notify(err)
        action.apiCode = err.code;
        action.code = ActionStatus.UNKNOW_ERROR;
        action.message = 'error';
        action.description = '' + err;
        reject(action);
      });
    });
  }

  fetchOnce(url: string): Promise<ActionStatus<any>> {
    let action = new ActionStatus<any>();
    return new Promise((resolve, reject) => {
      this.db.ref(url).once('value')
        .then((doc) => {
          try {
            action.result = doc.val();
            action.description = 'Successful fetching information';
            resolve(action);
          }
          catch (err) {
            // Bugsnag.notify(err)
            action.apiCode = err.code;
            action.code = ActionStatus.UNKNOW_ERROR;
            action.message = 'error';
            action.description = `${err}`;
            reject(action);
          }
        });
    });
  }


  fetch(url: string): Promise<ActionStatus<any>> {
    let action = new ActionStatus<any>();
    return new Promise<ActionStatus<any>>((resolve, reject) => {
      this.db.ref(url).on('value', (doc) => {
        try {
          // let r=[];
          // doc.forEach(element => {
          //   r.push(element.val());
          // });
          action.description = 'Successful fetching information';
          action.result = doc.val();
          resolve(action);
        }
        catch (err) {
          // Bugsnag.notify(err)
          action.apiCode = err.code;
          action.code = ActionStatus.UNKNOW_ERROR;
          action.message = 'error';
          action.description = `${err}`;
          reject(action);
        }
      });
    });
  }

  updates(updates: { link: String, data: any }[]): Promise<ActionStatus<any>> {
    return new Promise<ActionStatus<any>>((resolve, reject) => {
      let up = {};
      let result = new ActionStatus<any>();
      updates.forEach((update) => up[update.link.toString()] = update.data);
      this.db.ref().update(up, (error) => {
        if (error) {
          // Bugsnag.notify(error)
          result.apiCode = error.error;
          result.message = error.message;
          return reject(result);
        }
        resolve(result);
      })
    });
  }
  update(branch: any, arg1: Record<string | number, any>): Promise<ActionStatus<any>> {
    return this.updates([
      {
        link:branch,
        data:arg1
      }
    ])
  }

  delete(url: string): Promise<ActionStatus<any>> {
    let action = new ActionStatus<any>();
    return new Promise<ActionStatus<any>>((resolve, reject) => {
      try {
        this.db.ref(url).remove();
        action.description = 'Successful deleting information';
        resolve(action);
      }
      catch (err) {
        // Bugsnag.notify(err)
        action.apiCode = err.code;
        action.code = ActionStatus.UNKNOW_ERROR;
        action.message = 'error';
        action.description = `${err}`;
        reject(action);
      }
    });

  }

  get user() {
    return firebase.auth().currentUser;
  }

  auth() {
    return firebase.auth();
  }

  signInApi(email: string, password: string): Promise<ActionStatus<any>> {
    let result: ActionStatus<any> = new ActionStatus<any>();
    return new Promise(async (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          result.description = 'Authentification successful';
          result.result = userCredential;
          // console.log("Credential ",userCredential.user)
          resolve(result);
        })
        .catch((error) => {
          // Bugsnag.notify(error)
          // console.log('Error ', error)
          result.code = ActionStatus.UNKNOW_ERROR;
          result.apiCode = error.code;
          result.message = 'error';
          result.description = `${error}`;
          reject(result);
        });
    });
  }

  signOutApi() {
    firebase.auth().signOut();
  }

  updateUser(user: Record<string, any>): Promise<ActionStatus<any>> {
    return new Promise<ActionStatus<any>>((resolve, reject) => {
      let r = {}
      if (user.hasOwnProperty('name')) { r['displayName'] = user['name']; }
      if (user.hasOwnProperty('photoUrl')) { r['photoURL'] = user['photoUrl']; }
      this.db.currentUser.updateProfile(r)
        .then(() => resolve(new ActionStatus<any>()))
        .catch((error) => {
          // Bugsnag.notify(error)
          let result: ActionStatus<any> = new ActionStatus<any>();
          result.apiCode = error.error;
          result.message = error.getMessage();
        })
    });
  }

  createUserApi(email: string, password: string): Promise<ActionStatus<any>> {
    let result: ActionStatus<any> = new ActionStatus<any>();
    return new Promise(async (resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          result.description = 'Account was created successful';
          result.result = userCredential.user;
          resolve(result);
        })
        .catch((error) => {
          // Bugsnag.notify(error)
          result.code = ActionStatus.UNKNOW_ERROR;
          result.apiCode = error.code;
          result.message = `error: ${error.code}`;
          result.description = `${error.message}`;
          reject(result);
        });
    });
  }

  handleConnexionState(callBack: ({ connected: boolean }) => void) {
    // firebase.database().ref('.info/connected').on('value', (snap) => {
    //   if (snap.val() === true) { callBack({ connected: true }); }
    //   else { callBack({ connected: false }); }
    // })
  }

  handleApiError(result: ActionStatus<any>) {
    console.error("Error",result)
    switch (result.apiCode) {
      case FireBaseConstant.AUTH_USER_NOT_FOUND:
      case FireBaseConstant.AUTH_WRONG_PASSWORD:
      case FireBaseConstant.AUTH_ACCOUNT_EXIST_WITH_DIFFERENT_CREDENTIAL:
        result.message = 'Email ou mot de passe incorrect';
        break;
      case FireBaseConstant.AUTH_WEAK_PASSWORD:
        result.message = 'Le mot de passe doit avoir au moins 6 caractères';
        break;
      case FireBaseConstant.AUTH_EMAIL_ALREADY_USE:
        result.message = 'cet email est déjà utilisé';
        break;

      case FireBaseConstant.AUTH_REQUIRE_RECENT_LOGIN:
        result.message = "Vous devez vous connecter pour accéder à l'application. Si vous vous êtes récemment connecté, vous devez le faire à nouveau.";
        break;
      case FireBaseConstant.AUTH_CREDENTIAL_ALREADY_IN_USE:
        result.message = 'Vous êtes déjà connecté';
        break;
      case FireBaseConstant.AUTH_TOO_MANY_REQUEST:
        result.message = result.description;
        break;
      case FireBaseConstant.DESACTIVED_ACCOUNT:
        result.message = "Compte désactivé. Veuillez contacter l'administrateur pour une réactivation";
        break;
      case FireBaseConstant.NET_NETWORK_FAIL:
        result.message = 'Hors ligne. Veuillez vérifier votre connectivité réseau';
        break;
      case ActionStatus.INVALID_ARGUMENT_ERROR:
        break;
      default:
        // this.eventService.newBugEvent.next(bug);
        //Bugsnag.notify(bug.error)
        // console.log("Result error ",result)
        // result.message = 'Unknow error. Please contact administrator';
        break;
    }
  }
}

