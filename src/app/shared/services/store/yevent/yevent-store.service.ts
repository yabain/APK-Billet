import { Injectable } from '@angular/core';
import { YEntityID } from 'src/app/shared/entities';
import { YEvent } from 'src/app/shared/entities/events/yevent';
import { YEventState } from 'src/app/shared/enums';
import { ActionStatus } from 'src/app/shared/utils';
import { DbBranchEvent } from 'src/app/shared/utils/builders/db-branch';
import { FirebaseDataBaseApi } from 'src/app/shared/utils/services/firebase';
import { YAbstractEntityStoreService } from '../yabastractentity/yabstract-entity-store-service.service';

@Injectable({
  providedIn: 'root'
})
export class YEventStoreService extends YAbstractEntityStoreService<YEvent> {
  
  constructor(firebaseApi:FirebaseDataBaseApi) {
    super(firebaseApi);
  }

  createInstance(entity: Record<string, any>): YEvent {
    return new YEvent();
  }

  addEvent(event: YEvent): Promise<ActionStatus<void>>
  {
   return this.save(event,DbBranchEvent.getBranchOfEvent(event.id))
  }

  getAllEvent():Promise<ActionStatus<YEvent>>
  {
    return this.findAll(DbBranchEvent.getBranchOfEvents())
  }

  findEventsByKey(key:String,value:String):Promise<ActionStatus<YEvent[]>>
  {
    return this.findByKey(key,value,DbBranchEvent.getBranchOfEvents())
  }

  updateEvent(event: YEvent):  Promise<ActionStatus<YEvent>> {
    return this.update(event,DbBranchEvent.getBranchOfEvent(event.id))
  }

  getEventById(eventID: YEntityID):Promise<ActionStatus<YEvent>> {
    return this.findByID(eventID,DbBranchEvent.getBranchOfEvent(eventID))
  }

  addArtistToEvent(eventID:YEntityID,artisteID:YEntityID)
  {
    let o:any={};
    o[eventID.toString().toString()]=true;
    return this.updateAttibute(o,DbBranchEvent.getBranchOfEventArtist(eventID,artisteID))
  }

  changeEventStatus(eventID:YEntityID,status:YEventState):Promise<ActionStatus<void>>
  {
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      this.updateAttibute(status,`${DbBranchEvent.getBranchOfEventDetail(eventID)}/state`)
      .then((result)=>{
        this.store.get(eventID).state=status;
        resolve(result)
      })
      .catch((error)=>reject(error))
    })
  }
  
}
