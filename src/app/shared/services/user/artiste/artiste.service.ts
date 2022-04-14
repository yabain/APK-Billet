import { Injectable } from '@angular/core';
import { YArtiste } from 'src/app/shared/entities/users';
import { FirebaseDataBaseApi } from 'src/app/shared/utils/services/firebase';
import { YAbstractEntityStoreService } from '../../store/yabastractentity/yabstract-entity-store-service.service';

@Injectable({
  providedIn: 'root'
})
export class ArtisteService extends YAbstractEntityStoreService<YArtiste> {
  
  constructor(
    firebaseApi:FirebaseDataBaseApi
  ) { 
    super(firebaseApi)
  }
  

  createInstance(entity: Record<string, any>): YArtiste {
    return new YArtiste()
  }

}
