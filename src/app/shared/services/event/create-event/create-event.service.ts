import { Injectable } from '@angular/core';
import { YEntityID } from 'src/app/shared/entities';
import { YEvent } from 'src/app/shared/entities/events/yevent';
import { YEventInvitation, YNotification } from 'src/app/shared/entities/notifications';
import { YEventUpdateStateNotification } from 'src/app/shared/entities/notifications/yeventupdatestatenotification';
import { YOrganizer } from 'src/app/shared/entities/users';
import { YEventState } from 'src/app/shared/enums';
import { ActionStatus } from 'src/app/shared/utils';
import { YCONSTANTE } from 'src/app/shared/utils/helpers';
import { FirebaseError } from 'src/app/shared/utils/services/firebase';
import { YArtisteStoreService } from '../../store/yartiste/yartiste-store.service';
import { YEventStoreService } from '../../store/yevent/yevent-store.service';
import { YEventNotificationStoreService } from '../../store/yeventnotification/yevent-notification-store.service';
import { YEventPlaceStoreService } from '../../store/yeventplace/yevent-place-store.service';
import { YOrganizerStoreService } from '../../store/yorganizer/yorganizer-store.service';
import { YUserProfilService } from '../../user/user-profil/yuser-profil.service';

@Injectable({
  providedIn: 'root'
})
export class CreateEventService {
  
  constructor(
    private eventStoreService:YEventStoreService,
    private placeStoreService:YEventPlaceStoreService,
    private artisteStoreSercice:YArtisteStoreService,
    private organizerStoreServce:YOrganizerStoreService,
    private eventNotificationService:YEventNotificationStoreService,
    private userProfilService:YUserProfilService
  ) { }

  addNewEventDraft(draftEvent:YEvent)
  {
    return this.eventStoreService.addEvent(draftEvent)
  }

  //add list of organizer and artiste
  addEventPersonnal(eventID:YEntityID,artists:YEntityID[]=[],organizerList:YOrganizer[]=[])
  {
    return this.addArtiste(artists,eventID)
    .then((result)=> this.addEventPersonnal(eventID,artists))
  }

  addArtiste(artisteID:YEntityID[],eventID:YEntityID):Promise<ActionStatus<void>>
  {
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      Promise.all(artisteID.map((artiste)=> this.eventStoreService.addArtistToEvent(eventID,artiste)))
      .then((result)=> resolve(new ActionStatus()))
      .catch((error)=>reject(error))
    });
  }

  sendEventNotificationToOrganizers(eventID:YEntityID, organizerList:YOrganizer[])
  {
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      Promise.all(organizerList.map((organizer)=>{
        let invitation:YEventInvitation=new YEventInvitation();
        invitation.eventID.setId(eventID.toString());
        invitation.senderID.setId(this.userProfilService.currentUser.getValue().id.toString())
        invitation.receiverID.setId(organizer.id.toString());
        invitation.text="Vous avez été sélectionnez comme organisateur d'un évenement; Acceptez ou refusez?";
        return this.eventNotificationService.addNotification(invitation);
      }))
      .then((result:ActionStatus<void>[])=>{
        resolve(new ActionStatus())
      })
      .catch((error)=>{
        FirebaseError.handleApiError(error);
        reject(error);
      })
    })
  }

  acceptEventOrganizers(eventID:YEntityID,organizer:YOrganizer,notification:YNotification)
  {
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      this.organizerStoreServce.addOrganizer(organizer,eventID)
      .then((result)=> this.eventNotificationService.deleteNotification(notification))
      .then((result)=> resolve(result))
      .catch((error)=>reject(error))
    })
  }

  submitEventDraft(eventID:YEntityID):Promise<ActionStatus<void>>
  {
    return this.eventStoreService.changeEventStatus(eventID,YEventState.SUBMITED_DRAFT)
    .then((result)=>{
      let notification:YEventUpdateStateNotification=new YEventUpdateStateNotification();
      notification.eventID.setId(eventID.toString());
      notification.senderID.setId(this.userProfilService.currentUser.getValue().id.toString())
      notification.receiverID.setId(YCONSTANTE.DEFAULT_ADMIN_ID);
      return this.eventNotificationService.addNotification(notification)
    })
  }

  rejectEventOrgaiser(eventID:YEntityID,reason:String):Promise<ActionStatus<void>>
  {
    return this.eventStoreService.changeEventStatus(eventID,YEventState.REJECTED_STATE)
    .then((result)=>{
      let notification:YEventUpdateStateNotification=new YEventUpdateStateNotification();
      notification.eventID.setId(eventID.toString());
      notification.senderID.setId(YCONSTANTE.DEFAULT_ADMIN_ID)
      notification.receiverID.setId(this.userProfilService.currentUser.getValue().id.toString());
      notification.text=reason;
      return this.eventNotificationService.addNotification(notification)
    })
  }
}
