import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { YEntityID } from 'src/app/shared/entities';
import { FireBaseConstant } from './firebase-constant';
import { FirebaseDataBaseApi } from './FirebaseDatabaseApi';
import { ActionStatus } from '../../actionstatus';
import { CustomFile } from '../../entities';
import { FirebaseError } from './firebast-error';
import { AbstractFirebase } from './abtrasct-firebase';
import firebase  from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFile extends AbstractFirebase {

  constructor() {
    super();
    this.db=firebase.storage().ref();
   }
  uploadFile(repos:string,file:CustomFile):BehaviorSubject<ActionStatus<any>>
  {
    let result:ActionStatus<any>=new ActionStatus<any>();
    result.result=0;

    let subject:BehaviorSubject<ActionStatus<any>>=new BehaviorSubject<ActionStatus<any>>(result);

    let uploadTask=this.db.child(`${repos}/${(new YEntityID()).toString()}.${file.getExtention()}`).put(file.data,{
      contentType:file.type
    })
    
    uploadTask.on(this.firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot)=>
      {
        result.result=Math.trunc((snapshot.bytesTransferred/snapshot.totalBytes) *100);
        switch(snapshot.state)
        {
          case this.firebase.storage.TaskState.PAUSED:
            result.apiCode=ActionStatus.UPLOAD_PAUSED;            
            subject.next(result);
            break;
          case this.firebase.storage.TaskState.RUNNING:
            result.apiCode=ActionStatus.UPLOAD_RUNNING;
            subject.next(result)
            break;
        }
      },
      (error)=>{
        result.apiCode=error.code;
        subject.error(result);
      },
      ()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
          file.link=downloadURL;
          result.apiCode=ActionStatus.SUCCESS;
          result.result=file;
          subject.next(result);
          subject.complete()
        })
      }
    )
    return subject;
  }

  listAll(url=""):Promise<ActionStatus<CustomFile[]>>
  {
    return new Promise<ActionStatus<any>>((resolve,reject)=>{
      let actionResult=new ActionStatus<CustomFile[]>()
      this.db.child(url).listAll()
      .then((res)=>{
      
        actionResult.result=res.items.map((itemRef)=>{
          let custom:CustomFile=new CustomFile()
          custom.name=itemRef.name;
          custom.link=itemRef.getDownloadURL();
          return custom;
        })
        return Promise.all(actionResult.result.map((custom)=>custom.link))
      })
      .then((result:ActionStatus<any>[])=>{
        for(let i=0;i<result.length;i++)
        {
          actionResult.result[i].link=result[i];
        } 
        console.log("Erreur ",actionResult.result)        
        resolve(actionResult)
      })
      .catch((error)=>{
        console.log("Error ",error)
        actionResult.apiCode=error.code;
        actionResult.result=error;
        actionResult.message=error.message;
        FirebaseError.handleApiError(error);
        reject(error)
      })
    })
  }
  
}

