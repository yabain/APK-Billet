import { Injectable } from '@angular/core';
import { YEvent } from 'src/app/shared/entities/events/yevent';
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
}
