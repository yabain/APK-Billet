import { Injectable } from '@angular/core';
import { YEntityID } from 'src/app/shared/entities';
import { YUser } from 'src/app/shared/entities/users/yuser';
import { ActionStatus } from 'src/app/shared/utils';
import { DbBranchUser } from 'src/app/shared/utils/builders/db-branch';
import { YUserFactory } from 'src/app/shared/utils/factories';
import { FirebaseDataBaseApi, FirebaseError } from 'src/app/shared/utils/services/firebase';
import { YAbstractEntityStoreService } from '../yabastractentity/yabstract-entity-store-service.service';



@Injectable({
  providedIn: 'root'
})
export class YUserStoreService extends YAbstractEntityStoreService<YUser> {
  
  constructor(
    firebaseApi:FirebaseDataBaseApi,
    ) {
    super(firebaseApi)
  }

  createInstance(entity: Record<string, any>): YUser {
    return YUserFactory.getInstanceOf(entity);
  }
  
  addUser(user: YUser): Promise<ActionStatus<void>>
  {
   return this.save(user,DbBranchUser.getBranchOfUserProfil(user.id))
  }

  getAllUser():Promise<ActionStatus<YUser>>
  {
    return this.findAll(DbBranchUser.getBranchOfUsersProfil())
  }

  findUsersByKey(key:String,value:String):Promise<ActionStatus<YUser[]>>
  {
    return this.findByKey(key,value,DbBranchUser.getBranchOfUsersProfil())
  }

  updateUser(user: YUser):  Promise<ActionStatus<YUser>> {
    return this.update(user,DbBranchUser.getBranchOfUserProfil(user.id))
  }

  getUserById(userID: YEntityID):Promise<ActionStatus<YUser>> {
    return this.findByID(userID,DbBranchUser.getBranchOfUserProfil(userID))
  }

  createNewAccount(user:YUser):Promise<ActionStatus<void>>
  {
    return new Promise<ActionStatus<any>>((resolve,reject)=>{
      this.addUser(user)
      .then((result:ActionStatus<void>)=>resolve(result))
      .catch((error)=>{
        FirebaseError.handleApiError(error);
        reject(error)
      })
    })
  }

  
}
