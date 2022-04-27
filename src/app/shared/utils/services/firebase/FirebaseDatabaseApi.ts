import { Injectable, isDevMode } from '@angular/core';
import 'firebase/firestore';
import { ActionStatus } from '../../actionstatus';
import { AbstractFirebase } from './abtrasct-firebase';
import { FirebaseConfig } from './firebase-config';

import { FireBaseConstant } from './firebase-constant';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataBaseApi extends AbstractFirebase{
  
  constructor() {
    super()
    this.db = this.firebase.firestore();
    this.setUseEmulator();
  }  
  setUseEmulator()
  {
      if(location.hostname === "localhost") this.db.useEmulator("localhost",9000)
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

  handleConnexionState(callBack: ({ connected: boolean }) => void) {
    // this.firebase.database().ref('.info/connected').on('value', (snap) => {
    //   if (snap.val() === true) { callBack({ connected: true }); }
    //   else { callBack({ connected: false }); }
    // })
  }

  
}

