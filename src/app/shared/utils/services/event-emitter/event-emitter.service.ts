import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  eventStore:Map<String,BehaviorSubject<any>>=new Map()
  loginEvent = new BehaviorSubject<boolean>(false);
  loadedDataFromLocalStorage = new BehaviorSubject<boolean>(false);
  loadedDataFromApi = new BehaviorSubject<boolean>(false);
  logoutEvent=new BehaviorSubject<boolean>(false)

  subscribeToEvent(eventName:EventEmitterType):BehaviorSubject<any>
  {
    if(this.eventStore.has(eventName)) return  this.eventStore.get(eventName);
    let b = new BehaviorSubject(null);
    this.eventStore.set(eventName,b);
    return b;
  }

  emitEvent(eventName:EventEmitterType,value)
  {
    if(this.eventStore.has(eventName)) return this.eventStore.get(eventName).next(value);
    let b = new BehaviorSubject(value);
    this.eventStore.set(eventName,b);
  }
}


export enum EventEmitterType
{
  LOGGIN="loggin",
  LOGOUT="logout"
}