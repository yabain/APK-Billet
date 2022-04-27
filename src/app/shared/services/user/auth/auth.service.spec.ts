import { TestBed } from '@angular/core/testing';
import { YEntityID } from 'src/app/shared/entities';
import { YUser } from 'src/app/shared/entities/users';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

import { RegisterService } from './register.service';

describe('Authentification Service', () => {
  let registrationService: RegisterService;
  let loginService: LoginService;
  let authService:AuthService;
  let user:YUser;

  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  beforeAll(() => {
    TestBed.configureTestingModule({});
    registrationService = TestBed.inject(RegisterService);
    loginService = TestBed.inject(LoginService);
    authService = TestBed.inject(AuthService);
    user = new YUser();
    user.email="cednguendap2@gmail.com";
    user.firstName="Cédric";
    user.lastName="Nguendap";
    user.id.setId("cedric1234");
    // user.password=(new YEntityID()).toString();
    user.password="cedric1234";
  });

  it('registration service should be created', () => {
    expect(registrationService).toBeTruthy();
  });
  it('login should service be created', () => {
    expect(loginService).toBeTruthy();
  });

  describe("Registration process",()=>{
    // it("firebase auth creation account",async ()=>{
    //   let accountResult = authService.createAccount(user);
    //   accountResult.then((value)=>{
    //     user.id.setId(value.result.id.toString())
    //   })
    //   expectAsync(accountResult).toBeResolved()      
    // })
    it('firebase auth create account complete process',async ()=>{
      let accountResult = registrationService.register(user);
      await expectAsync(accountResult).toBeResolved();
    })
    // it("firebase auth login account correct",async ()=>{
    //   let accountResult = authService.authLogin(user);
    //   await expectAsync(accountResult).toBeResolved();
    // })
    // it("firebase auth login account incorrect ",async ()=>{
    //   await expectAsync(authService.authLogin(new YUser())).toBeRejected();
    // })

    
  })

});
