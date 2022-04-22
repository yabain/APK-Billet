import { Component, OnInit } from '@angular/core';
import { YUser } from 'src/app/shared/entities/users';
import { YUserStoreService } from 'src/app/shared/services/store/yuser/yuser-store.service';
import { UserPreferenceService } from 'src/app/shared/services/user/user-preference/user-preference.service';
import { YUserProfilService } from 'src/app/shared/services/user/user-profil/yuser-profil.service';
import { FirebaseError } from 'src/app/shared/utils/services/firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login = { username: '', password: '' };
  submitted = false;
  constructor(
    private preferencesService:UserPreferenceService,
    private usersStoreService:YUserStoreService,
    private userProfile:YUserProfilService
  ) { 
    preferencesService.getPreferencesFromDevice()
  }

  ngOnInit() {}
  saveUser()
  {
    let user = new YUser();
    this.usersStoreService.createNewAccount(user)
    .then((result)=>{
      this.userProfile.setUser(user);
      // return this.userPreference.initPreference()
      console.log("Ok save")
    })
    .catch((error)=>{
      FirebaseError.handleApiError(error);
      console.error("Error: ",error)
    })
  }
}
