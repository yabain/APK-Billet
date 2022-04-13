import { Injectable } from '@angular/core';
import { YEntityID } from 'src/app/shared/entities';
import { YEventPlace } from 'src/app/shared/entities/events/yeventplace';
import { ActionStatus } from 'src/app/shared/utils';
import { DbBranchEventPlace } from 'src/app/shared/utils/builders/db-branch';
import { FirebaseDataBaseApi } from 'src/app/shared/utils/services/firebase';
import { YAbstractEntityStoreService } from '../yabastractentity/yabstract-entity-store-service.service';

@Injectable({
  providedIn: 'root'
})
export class YEventPlaceStoreService extends YAbstractEntityStoreService<YEventPlace> {

  constructor(firebaseApi:FirebaseDataBaseApi) { 
    super(firebaseApi);
  }
  
  createInstance(entity: Record<string, any>): YEventPlace {
    return new YEventPlace();
  }

  addEventPlace(EventPlace: YEventPlace): Promise<ActionStatus<void>>
  {
   return this.save(EventPlace,DbBranchEventPlace.getBranchOfEventPlace(EventPlace.id))
  }

  getAllEventPlace():Promise<ActionStatus<YEventPlace>>
  {
    return this.findAll(DbBranchEventPlace.getBranchOfEventPlaces())
  }

  findEventPlacesByKey(key:String,value:String):Promise<ActionStatus<YEventPlace[]>>
  {
    return this.findByKey(key,value,DbBranchEventPlace.getBranchOfEventPlaces())
  }

  updateEventPlace(EventPlace: YEventPlace):  Promise<ActionStatus<YEventPlace>> {
    return this.update(EventPlace,DbBranchEventPlace.getBranchOfEventPlace(EventPlace.id))
  }

  getEventPlaceById(EventPlaceID: YEntityID):Promise<ActionStatus<YEventPlace>> {
    return this.findByID(EventPlaceID,DbBranchEventPlace.getBranchOfEventPlace(EventPlaceID))
  }

}
