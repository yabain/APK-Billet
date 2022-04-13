import { Injectable } from '@angular/core';
import { YEntityID } from 'src/app/shared/entities';
import { YUser } from 'src/app/shared/entities/users/yuser';
import { ActionStatus } from 'src/app/shared/utils';
import { DbBranchUser } from 'src/app/shared/utils/builders/db-branch';
import { YUserFactory } from 'src/app/shared/utils/factories';
import { FirebaseDataBaseApi } from 'src/app/shared/utils/services/firebase';
import { AuthService } from '../../user/auth/auth.service';
import { YAbstractEntityStoreService } from '../yabastractentity/yabstract-entity-store-service.service';



@Injectable({
  providedIn: 'root'
})
export class YUserStoreService extends YAbstractEntityStoreService<YUser> {
  
  constructor(
    firebaseApi:FirebaseDataBaseApi,
    private authService:AuthService
    ) {
    super(firebaseApi)
  }

  createInstance(entity: Record<string, any>): YUser {
    return YUserFactory.getInstanceOf(entity);
  }
  
  addUser(user: YUser): Promise<ActionStatus<void>>
  {
   return this.save(user,DbBranchUser.getBranchOfUser(user.id))
  }

  getAllUser():Promise<ActionStatus<YUser>>
  {
    return this.findAll(DbBranchUser.getBranchOfUsers())
  }

  findUsersByKey(key:String,value:String):Promise<ActionStatus<YUser[]>>
  {
    return this.findByKey(key,value,DbBranchUser.getBranchOfUsers())
  }

  updateUser(user: YUser):  Promise<ActionStatus<YUser>> {
    return this.update(user,DbBranchUser.getBranchOfUser(user.id))
  }

  getUserById(userID: YEntityID):Promise<ActionStatus<YUser>> {
    return this.findByID(userID,DbBranchUser.getBranchOfUser(userID))
  }

  createNewAccount(user:YUser):Promise<ActionStatus<void>>
  {
    return new Promise<ActionStatus<any>>((resolve,reject)=>{
      this.authService.createAccount(user)
      .then((result:ActionStatus<YUser>)=>this.addUser(result.result))
      .then((result:ActionStatus<void>)=>resolve(result))
      .catch((error)=>{
        this.firebaseApi.handleApiError(error);
        reject(error)
      })
    })
  }

  
}
