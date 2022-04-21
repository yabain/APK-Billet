import { Injectable } from '@angular/core';
import { YEntityID } from 'src/app/shared/entities';
import { YArtiste } from 'src/app/shared/entities/users';
import { ActionStatus } from 'src/app/shared/utils';
import { DbBranchArtiste } from 'src/app/shared/utils/builders/db-branch';
import { FirebaseDataBaseApi } from 'src/app/shared/utils/services/firebase';
import { YAbstractEntityStoreService } from '../yabastractentity/yabstract-entity-store-service.service';

@Injectable({
  providedIn: 'root'
})
export class YArtisteStoreService extends YAbstractEntityStoreService<YArtiste> {
  
   
  constructor(firebaseApi:FirebaseDataBaseApi) {
    super(firebaseApi);
  }

  createInstance(entity: Record<string, any>): YArtiste {
    return new YArtiste()
  }

  addArtiste(artiste: YArtiste): Promise<ActionStatus<void>>
  {
   return this.save(artiste,DbBranchArtiste.getBranchOfArtiste(artiste.id))
  }

  getAllArtiste():Promise<ActionStatus<YArtiste>>
  {
    return this.findAll(DbBranchArtiste.getBranchOfArtistes())
  }

  findArtistesByKey(key:String,value:String):Promise<ActionStatus<YArtiste[]>>
  {
    return this.findByKey(key,value,DbBranchArtiste.getBranchOfArtistes())
  }

  updateArtiste(artiste: YArtiste):  Promise<ActionStatus<YArtiste>> {
    return this.update(artiste,DbBranchArtiste.getBranchOfArtiste(artiste.id))
  }

  getArtisteById(artisteID: YEntityID):Promise<ActionStatus<YArtiste>> {
    return this.findByID(artisteID,DbBranchArtiste.getBranchOfArtiste(artisteID))
  }

}
