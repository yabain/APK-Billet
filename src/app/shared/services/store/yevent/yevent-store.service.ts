import { Injectable } from '@angular/core';
import { YEntityID } from 'src/app/shared/entities';
import { YEvent } from 'src/app/shared/entities/events/yevent';
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
}
