import { Injectable } from '@angular/core';
import { YEntityID } from 'src/app/shared/entities';
import { YEventInvitation, YNotification } from 'src/app/shared/entities/notifications';
import { ActionStatus } from 'src/app/shared/utils';
import { DbBranchNotification } from 'src/app/shared/utils/builders/db-branch';
import { YNotificationFactory } from 'src/app/shared/utils/factories';
import { FirebaseDataBaseApi } from 'src/app/shared/utils/services/firebase';
import { YAbstractEntityStoreService } from '../yabastractentity/yabstract-entity-store-service.service';

@Injectable({
  providedIn: 'root'
})
export class YEventNotificationStoreService extends YAbstractEntityStoreService<YNotification> {
 
  constructor(firebaseApi:FirebaseDataBaseApi) {
    super(firebaseApi);
  }

  createInstance(entity: any): YNotification {
    return YNotificationFactory.getInstanceOf(entity);
  }

  addNotification(notification: YNotification): Promise<ActionStatus<void>>
  {
   return this.save(notification,DbBranchNotification.getBranchOfNotification(notification.id))
  }

  getAllNotification():Promise<ActionStatus<YNotification>>
  {
    return this.findAll(DbBranchNotification.getBranchOfNotifications())
  }

  findNotificationsByKey(key:String,value:String):Promise<ActionStatus<YNotification[]>>
  {
    return this.findByKey(key,value,DbBranchNotification.getBranchOfNotifications())
  }

  updateNotification(notification: YNotification):  Promise<ActionStatus<YNotification>> {
    return this.update(notification,DbBranchNotification.getBranchOfNotification(notification.id))
  }

  getNotificationById(notificationID: YEntityID):Promise<ActionStatus<YNotification>> {
    return this.findByID(notificationID,DbBranchNotification.getBranchOfNotification(notificationID))
  }

  deleteNotification(notification:YNotification):Promise<ActionStatus<void>> {
    return this.delete(notification,DbBranchNotification.getBranchOfNotification(notification.id))
  }

}
