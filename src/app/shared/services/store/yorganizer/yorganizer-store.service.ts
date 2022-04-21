import { Injectable } from '@angular/core';
import { YEntityID } from 'src/app/shared/entities';
import { YEvent } from 'src/app/shared/entities/events/yevent';
import { YOrganizer } from 'src/app/shared/entities/users';
import { ActionStatus } from 'src/app/shared/utils';
import { DbBranchEvent } from 'src/app/shared/utils/builders/db-branch';
import { FirebaseDataBaseApi } from 'src/app/shared/utils/services/firebase';
import { YAbstractEntityStoreService } from '../yabastractentity/yabstract-entity-store-service.service';

@Injectable({
  providedIn: 'root'
})
export class YOrganizerStoreService extends YAbstractEntityStoreService<YOrganizer> {
  
   
  constructor(firebaseApi:FirebaseDataBaseApi) {
    super(firebaseApi);
  }

  createInstance(entity: Record<string, any>): YOrganizer {
    return new YOrganizer()
  }

  addOrganizer(organizer: YOrganizer,eventID:YEntityID): Promise<ActionStatus<void>>
  {
    //  return this.save(Organizer,DbBranchEvent.getBranchOfEventOrganizers(eventID))
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      this.updateAttibute({},DbBranchEvent.getBranchOfEventOrganizers(eventID))
      .then((value)=>{
        this.addObject(organizer);
        resolve(value)
      })
      .catch((error)=>reject(error))
    })
  }

  getAllOrganizer(eventID:YEntityID):Promise<ActionStatus<YOrganizer>>
  {
    return this.findAll(DbBranchEvent.getBranchOfEventOrganizers(eventID))
  }

  findOrganizersByKey(key:String,value:String,eventID:YEntityID):Promise<ActionStatus<YOrganizer[]>>
  {
    return this.findByKey(key,value,DbBranchEvent.getBranchOfEventOrganizers(eventID))
  }

  updateOrganizer(Organizer: YOrganizer,eventID:YEntityID):  Promise<ActionStatus<YOrganizer>> {
    return this.update(Organizer,DbBranchEvent.getBranchOfEventOrganizer(eventID,Organizer.id))
  }

  getOrganizerById(OrganizerID: YEntityID,eventID:YEntityID):Promise<ActionStatus<YOrganizer>> {
    return this.findByID(OrganizerID,DbBranchEvent.getBranchOfEventOrganizer(eventID,OrganizerID))
  }

}
