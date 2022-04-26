import { ActionStatus } from "../../actionstatus";
import { AbstractFirebase } from "./abtrasct-firebase";
import "firebase/auth"

export class FireBaseAuth extends AbstractFirebase
{
    signInApi(email: string, password: string): Promise<ActionStatus<any>> {
        let result: ActionStatus<any> = new ActionStatus<any>();
        return new Promise(async (resolve, reject) => {
          this.firebase.auth().signInWithEmailAndPassword(email, password)
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
        this.firebase.auth().signOut();
    }

    get user() {
        return this.firebase.auth().currentUser;
    }

    auth() {
        return this.firebase.auth();
    }

    createUserApi(email: string, password: string): Promise<ActionStatus<any>> {
        let result: ActionStatus<any> = new ActionStatus<any>();
        return new Promise(async (resolve, reject) => {
          this.firebase.auth().createUserWithEmailAndPassword(email, password)
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