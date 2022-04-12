import { Injectable } from '@angular/core';
import { YEventInvitation } from 'src/app/shared/entities/notifications';
import { FirebaseDataBaseApi } from 'src/app/shared/utils/services/firebase';
import { YAbstractEntityStoreService } from '../yabastractentity/yabstract-entity-store-service.service';

@Injectable({
  providedIn: 'root'
})
export class YEventInvitationStoreService extends YAbstractEntityStoreService<YEventInvitation> {
 
  constructor(firebaseApi:FirebaseDataBaseApi) {
    super(firebaseApi);
  }
  createInstance(entity: any): YEventInvitation {
    return new YEventInvitation();
  }
}
