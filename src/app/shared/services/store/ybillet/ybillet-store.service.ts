import { Injectable } from '@angular/core';
import { YBillet } from 'src/app/shared/entities/billets/ybillet';
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
}
