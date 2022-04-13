import { Injectable } from '@angular/core';
import { YEntityID } from 'src/app/shared/entities';
import { YBillet } from 'src/app/shared/entities/billets/ybillet';
import { ActionStatus } from 'src/app/shared/utils';
import { DbBranchBillet } from 'src/app/shared/utils/builders/db-branch';
import { FirebaseDataBaseApi } from 'src/app/shared/utils/services/firebase';
import { YAbstractEntityStoreService } from '../yabastractentity/yabstract-entity-store-service.service';

@Injectable({
  providedIn: 'root'
})
export class YBilletStoreService extends YAbstractEntityStoreService<YBillet> {
  
   
  constructor(firebaseApi:FirebaseDataBaseApi) {
    super(firebaseApi);
  }

  createInstance(entity: Record<string, any>): YBillet {
    return new YBillet()
  }

  addBillet(billet: YBillet): Promise<ActionStatus<void>>
  {
   return this.save(billet,DbBranchBillet.getBranchOfBillet(billet.id))
  }

  getAllBillet():Promise<ActionStatus<YBillet>>
  {
    return this.findAll(DbBranchBillet.getBranchOfBillets())
  }

  findBilletsByKey(key:String,value:String):Promise<ActionStatus<YBillet[]>>
  {
    return this.findByKey(key,value,DbBranchBillet.getBranchOfBillets())
  }

  updateBillet(billet: YBillet):  Promise<ActionStatus<YBillet>> {
    return this.update(billet,DbBranchBillet.getBranchOfBillet(billet.id))
  }

  getBilletById(billetID: YEntityID):Promise<ActionStatus<YBillet>> {
    return this.findByID(billetID,DbBranchBillet.getBranchOfBillet(billetID))
  }

}
