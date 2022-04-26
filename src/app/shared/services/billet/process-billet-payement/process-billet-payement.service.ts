import { Injectable } from '@angular/core';
import { YEntityID } from 'src/app/shared/entities';
import { YBillet } from 'src/app/shared/entities/billets/ybillet';
import { YBilletState, YBuyBilletState } from 'src/app/shared/enums';
import { ActionStatus } from 'src/app/shared/utils';
import { YBilletStoreService } from '../../store/ybillet/ybillet-store.service';
import { YEventStoreService } from '../../store/yevent/yevent-store.service';
import { YUserProfilService } from '../../user/user-profil/yuser-profil.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessBilletPayementService {

  constructor(
    private userProfilService:YUserProfilService,
    private eventEventStoreService:YEventStoreService,
    private billetStoreService:YBilletStoreService
  ) { }

  createBillet():Promise<ActionStatus<void>>
  {
    let billet:YBillet = new YBillet();
    billet.state=YBilletState.UN_RESERVED;
    return this.billetStoreService.addBillet(billet);    
  } 

  makePaiement(billetID:YEntityID):Promise<ActionStatus<void>>
  {
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      this.billetStoreService.updateBilletState({buyState:YBuyBilletState.WAITING_CONFIRMATION},billetID)
      .then((result)=>{
        resolve(new ActionStatus())
      })
      .catch((error)=>reject(error))
    })
    
  }
}
