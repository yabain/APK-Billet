import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { YEntity, YEntityID } from 'src/app/shared/entities';
import { ActionStatus } from 'src/app/shared/utils';
import { FirebaseDataBaseApi, FirebaseError } from 'src/app/shared/utils/services/firebase';

@Injectable({
  providedIn: 'root'
})
export abstract class YAbstractEntityStoreService<T extends YEntity> {
  store: Map<any, T> = new Map<any, T>();
  storeSubject:BehaviorSubject<Map<any, T>>=new BehaviorSubject<Map<any, T>>(new Map<any, T>());
  constructor(
    protected firebaseApi:FirebaseDataBaseApi
  ) { }



  setstore(objs:Map<String,T>)
  {
    this.storeSubject.next(objs)
  }

  getstore(): T[] 
  {
    let r: T[] = [];
    this.storeSubject.getValue().forEach((value: T) => r.push(value));
    return r;
  }

  addObject(obj: T) {
    this.store.set(obj.id.toString(),obj);
    this.setstore(this.store);  
  }

  deleteObject(obj:T)
  {
    if(this.store.has(obj.id.toString())) this.store.delete(obj.id.toString())
    this.setstore(this.store);
  }

  protected save(object:T,branch:String):Promise<ActionStatus<void>>
  {
    return new Promise<ActionStatus<void>>((resolve, reject) => {
        if (this.store.has(object.id.toString())) { return resolve(new ActionStatus()); }
        this.firebaseApi.set(branch.toString(), object.toString())
        .then((result) => 
        {
            this.addObject(object);
            resolve(new ActionStatus());
        }).catch((error) => {
        FirebaseError.handleApiError(error);
        reject(error);
        });
    });
  }

  protected update(obj:T,branch): Promise<ActionStatus<T>> {
    return new Promise<ActionStatus<T>>((resolve,reject)=>{
      this.updateAttibute(obj.toString(),branch)
      .then((value)=>{
        this.addObject(obj);
        resolve(value)
      })
      .catch((error)=>reject(error))
    })
  }

  protected updateAttibute(value,branch):Promise<ActionStatus<T>> {
    return new Promise<ActionStatus<T>>((resolve, reject) => {
      this.firebaseApi.update(branch, value)
        .then((result: ActionStatus<T>) => {              
            resolve(result)
        })
        .catch((error: ActionStatus<T>) => {
          FirebaseError.handleApiError(error);
          reject(error);
        });
    });
  }
  protected delete(obj:T,branch): Promise<ActionStatus<T>> {
      return new Promise<ActionStatus<T>>((resolve, reject) => {
        this.firebaseApi.delete(branch)
          .then((result: ActionStatus<T>) => {
              this.deleteObject(obj)
              resolve(result)
          })
          .catch((error: ActionStatus<T>) => {
            FirebaseError.handleApiError(error);
            reject(error);
          });
      });
  }

  protected findByID(objID: YEntityID,branch:String): Promise<ActionStatus<T>> {
    return new Promise<ActionStatus<T>>((resolve, reject) => {
      let result: ActionStatus<T> = new ActionStatus<T>();

      if (this.store.has(objID.toString())) {
        result.result = this.store.get(objID.toString());
        return resolve(result);
      }
      this.firebaseApi.fetchOnce(branch.toString())
      .then((value:ActionStatus<T>)=>{
        let data={};
        // for(let key in value.result)
        // {
        //   data=value.result[key];
        // }
          let instance:T=this.hydrateObjet(value.result)
          this.addObject(instance);
          result.result=instance;
          resolve(result);
      })
      .catch((error:ActionStatus<T>)=>{
          reject(error);
      });
    });
  }
  hydrateObjet(entity:Record<string,any>):T
  {
    let obj:T=this.createInstance(entity);
    obj.hydrate(entity);
    return obj
  }

  abstract createInstance(entity:Record<string,any>):T;

  protected findAll(branch:String):Promise<ActionStatus<T[]>>
  {
    return new Promise<ActionStatus<T>>((resolve,reject)=>{
      this.firebaseApi.fetchOnce(branch.toString())
      .then((result:ActionStatus<T>)=>{
        let data=result.result;
        for(let key in data)
        {
          let obj = this.hydrateObjet(data[key])
          this.store.set(obj.id.toString(),obj);
        }
        this.setstore(this.store)
        resolve(new ActionStatus())
      })
      .catch((error)=>reject(error))
    })
  }

  protected findByKey(key:String,value:String,branch):Promise<ActionStatus<T[]>>
  {
    return new Promise<ActionStatus<T[]>>((resolve,reject)=>{
      this.firebaseApi.getFirebaseApp()
      .ref(branch)
      .orderByChild(key)
      .equalTo(value)
      .once("value",(result)=>{
        let data=result.val();
        let objs:T[]=[];
        for(let key in data)
        {
          let inst:T=this.hydrateObjet(data[key])
          // this.storeUser.set(key,user);
          objs.push(inst);
        }
        let actionResult=new ActionStatus();
        actionResult.result=objs;
        resolve(actionResult);
      })
    })
  }

  findObjectLocalByKey(key:String,value:String):T[]
  {
    return Array.from(this.storeSubject.getValue().values())
      .filter((obj:T)=>obj[key.toString()]==value)
  }

}
