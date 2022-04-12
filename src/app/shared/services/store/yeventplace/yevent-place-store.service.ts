import { Injectable } from '@angular/core';
import { YEventPlace } from 'src/app/shared/entities/events/yeventplace';
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
}
