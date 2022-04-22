import { Injectable, isDevMode } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';
import { ActionStatus } from '../../actionstatus';
import { AbstractFirebase } from './abtrasct-firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFireStoreApi extends AbstractFirebase{
  constructor() {
    super();
    this.db = firebase.firestore();
  }
 
  private getUrlSegments(url:String)
  {
    if(url.indexOf("/")>=0) 
    {
      return [url.substring(0,url.lastIndexOf("/")),url.substring(url.lastIndexOf("/")+1)]
    }
    else return [url]
  }
  private getRequest(url:String)
  {
    let urlSegment=this.getUrlSegments(url);
    let req = this.db.collection(urlSegment[0]);
    if(urlSegment.length>1) req=req.doc(urlSegment[1]);
    else req=req.doc();
    return req;
  }

  add(url: string, value: any): Promise<ActionStatus<any>> {
    return this.set(url,value);
  }

  set(url: string, value: any): Promise<ActionStatus<any>> {
    let action = new ActionStatus<any>();
    return new Promise<ActionStatus<any>>((resolve, reject) => {
      
      this.getRequest(url).set(value).then(() => {
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
      this.getRequest(url).get()
        .then((doc) => {
          action.result = doc.data();
          action.description = 'Successful fetching information';
          resolve(action);         
        })
        .catch ((err)=> {
          // Bugsnag.notify(err)
          action.apiCode = err.code;
          action.code = ActionStatus.UNKNOW_ERROR;
          action.message = 'error';
          action.description = `${err}`;
          reject(action);
        });
    });
  }


  fetch(url: string): Promise<ActionStatus<any>> {
    let action = new ActionStatus<any>();
    return new Promise<ActionStatus<any>>((resolve, reject) => {
      this.getRequest(url).onSnapshot((doc) => {
        try {
          action.description = 'Successful fetching information';
          action.result = doc.data();
          resolve(action);
        }
        catch (err) {
          action.apiCode = err.code;
          action.code = ActionStatus.UNKNOW_ERROR;
          action.message = 'error';
          action.description = `${err}`;
          reject(action);
        }
      });
    });
  }

  update(url: any, value: Record<string | number, any>): Promise<ActionStatus<any>> {
    return this.set(url,value)
  }

  delete(url: string): Promise<ActionStatus<any>> {
    let action = new ActionStatus<any>();
    return new Promise<ActionStatus<any>>((resolve, reject) => {
      this.getRequest(url).delete()
      .then((result)=> {
        
        action.description = 'Successful deleting information';
        resolve(action);
      }).
      catch ((err)=>{
        // Bugsnag.notify(err)
        action.apiCode = err.code;
        action.code = ActionStatus.UNKNOW_ERROR;
        action.message = 'error';
        action.description = `${err}`;
        reject(action);
      })
    });

  }
}

