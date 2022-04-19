import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, mergeMap } from "rxjs/operators";
import { YEvent } from 'src/app/shared/entities/events/yevent';
import { YEventSubType, YEventType } from 'src/app/shared/enums';
import { DbBranchEvent } from 'src/app/shared/utils/builders/db-branch';
import { YEnumUtil } from 'src/app/shared/utils/helpers';
import { EventEmitterService, EventEmitterType } from 'src/app/shared/utils/services/event-emitter/event-emitter.service';
import { FirebaseDataBaseApi } from 'src/app/shared/utils/services/firebase';
import { YEventStoreService } from '../../store/yevent/yevent-store.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderEventService {
  eventStore:Map<string, BehaviorSubject<Map<String,YEvent>>>=new Map();
  // categoriesQueryBuilder:Map<String,FirebaseCursor>= new Map();
  constructor(
    private eventStoreService:YEventStoreService,
    private eventEmitterService:EventEmitterService,
    private firebaseApi:FirebaseDataBaseApi
  ) {
    this.eventStoreService.storeSubject.subscribe((mapStore)=>{
      this.dispatchEvent(mapStore)
    })

    this.eventEmitterService.subscribeToEvent(EventEmitterType.LOGGIN)
    .subscribe((isLoggin)=>{
      if(isLoggin) this.loaderInitEvent();
    })
    YEnumUtil.getListOfValue(YEventType).forEach((value)=>{

      // let fcursor=new FirebaseCursor(
      //   this.firebaseApi.getFirebaseApp()
      //   .ref(DbBranchEvent.getBranchOfEvents()),
      //   10,
      //   "createdDate"
      //   )
    })
  }
  private loaderInitEvent() 
  {
    
  }

  dispatchEvent(mapStore:Map<string,YEvent>)
  {
    for (const event of Array.from(mapStore.values()))
    {
      if(this.eventStore.has(event.type)) 
      {
        this.eventStore.get(event.type).getValue().set(event.id.toString(),event);
        this.eventStore.get(event.type).next(this.eventStore.get(event.type).getValue());
      }
      else
      {
        let mapEvent=new Map<String,YEvent>();
        mapEvent.set(event.id.toString(),event);
        let behaviorEventSubject=new BehaviorSubject(mapEvent);
        this.eventStore.set(event.type,behaviorEventSubject);
      }
    }
  }
  private getSubscriptionByType(type:YEventType)
  {
    if(this.eventStore.has(type)) return this.eventStore.get(type)
    return null;
  }
  subscribeToEventByType(type:YEventType)
  {
    let bType=this.getSubscriptionByType(type);
    if(bType) return bType.pipe((mergeMap((valueMap)=>Array.from(valueMap.values()))));
    return null;
  }

  subscribeToEventBySubType(type:YEventType, subType:YEventSubType)
  {
    let bType=this.getSubscriptionByType(type);
    if(!bType) return null;
    return bType.pipe(
      mergeMap((value)=>{
        return Array.from(bType.getValue().values()).filter((event)=>event.subType==subType)
      })
    );
  }


}
