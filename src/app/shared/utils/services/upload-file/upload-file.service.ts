import { Injectable } from '@angular/core';
import { CustomFile } from 'src/app/shared/entities';
import { ActionStatus } from 'src/app/shared/others/actionstatus';
import { FirebaseFile } from '../firebase';
import { ToastrNotificationService } from '../toastr-notification/toastr-notification.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private notificationService:ToastrNotificationService,
    private firebaseFile:FirebaseFile
  ) { }
  uploadFile(file:CustomFile,folder:String):Promise<ActionStatus<CustomFile>>
  {
    console.log("File ",file)
    let actionResult=new ActionStatus()
    return new Promise<ActionStatus<CustomFile>>((resolveIn,rejectIn)=>{
      this.notificationService.asyncNotification(new Promise((resolve,reject)=>{
        this.firebaseFile.uploadFile(folder.toString(),file)
        .subscribe({
          complete:()=>{
            resolve(file)
          },
          error:(error)=>reject(error)
        })
      }),
      (resp)=>{
        this.notificationService.successNofitication(`L'image ${file.name} a été uploadé avec success`)
        actionResult.result=file
        resolveIn(actionResult)
      },
      (error)=>{
        console.log("upload Error: ",error)
        rejectIn(actionResult)
        return `Erreur lors de l'uplodad de l'image ${file.name}:${error.message}`
      }
      ,
      `Chargement de l'image ${file.name} en cours`
      )
    })
    
  }
}
