import { Injectable } from "@angular/core";
import { ActionStatus } from "../../actionstatus";
import { AbstractFirebase } from "./abtrasct-firebase";
import "firebase/auth"

@Injectable({
  providedIn:'root'
})
export class FireBaseAuth extends AbstractFirebase
{
  constructor()
  {
    super();
    this.db=this.firebase.auth();
    this.setUseEmulator();
  }
  setUseEmulator()
  {
      if(location.hostname === "localhost") this.db.useEmulator("http://localhost:9099")
  }
    signInApi(email: string, password: string): Promise<ActionStatus<any>> {
        let result: ActionStatus<any> = new ActionStatus<any>();
        return new Promise(async (resolve, reject) => {
          this.db.signInWithEmailAndPassword(email, password)
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
        this.db.signOut();
    }

    get user() {
        return this.db.currentUser;
    }

    auth() {
        return this.db;
    }

    createUserApi(email: string, password: string): Promise<ActionStatus<any>> {
        let result: ActionStatus<any> = new ActionStatus<any>();
        return new Promise(async (resolve, reject) => {
          this.db.createUserWithEmailAndPassword(email, password)
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
}