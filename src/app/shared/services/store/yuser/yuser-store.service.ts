import { Injectable } from '@angular/core';
import { YUser } from 'src/app/shared/entities/users/yuser';
import { YUserFactory } from 'src/app/shared/utils/factories';
import { FirebaseDataBaseApi } from 'src/app/shared/utils/services/firebase';
import { YAbstractEntityStoreService } from '../yabastractentity/yabstract-entity-store-service.service';

@Injectable({
  providedIn: 'root'
})
export class YUserStoreService extends YAbstractEntityStoreService<YUser> {
  
  constructor(firebaseApi:FirebaseDataBaseApi) {
    super(firebaseApi)
  }

  createInstance(entity: Record<string, any>): YUser {
    return YUserFactory.getInstanceOf(entity);
  }
}
