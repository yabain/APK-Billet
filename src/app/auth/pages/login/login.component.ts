import { Component, OnInit } from '@angular/core';
import { UserPreferenceService } from 'src/app/shared/services/user/user-preference/user-preference.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login = { username: '', password: '' };
  submitted = false;
  constructor(
    private preferencesService:UserPreferenceService
  ) { 
    preferencesService.getPreferencesFromDevice()
  }

  ngOnInit() {}

}
