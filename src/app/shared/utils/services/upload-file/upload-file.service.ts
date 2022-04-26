import { Injectable } from '@angular/core';
import { ActionStatus } from '../../actionstatus';
import { CustomFile } from '../../entities';
import { FirebaseFile } from '../firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private firebaseFile:FirebaseFile
  ) { }
  uploadFile(file:CustomFile,folder:String):Promise<ActionStatus<CustomFile>>
  {
    let actionResult=new ActionStatus()
    return new Promise<ActionStatus<CustomFile>>((resolveIn,rejectIn)=>{
        this.firebaseFile.uploadFile(folder.toString(),file)
        .subscribe({
          complete:()=>{
            // this.notificationService.successNofitication(`L'image ${file.name} a été uploadé avec success`)
            actionResult.result=file
            resolveIn(actionResult)
          },
          error:(error)=>{
            console.log("upload Error: ",error)
            rejectIn(actionResult)
          }
        })   
    })
  }
}
