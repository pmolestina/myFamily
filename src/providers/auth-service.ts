import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods, FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/map';

export class ValidationResponse {
  validRequest: boolean;
  message: string;
  requestType: string;

  constructor(requestType: string) {
    this.requestType = requestType;
  }
}

@Injectable()
export class AuthService {
  firebaseAuth: any;
  userProfile: any;
  authConfig:any;
  get currentUser(): any {
   
    return this.firebaseAuth.currentUser;
  }
  constructor(public af: AngularFire, @Inject(FirebaseApp) fa: any) {
    this.firebaseAuth = fa.auth();
    this.authConfig = {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    };

  }
  public login(credentials) {
    
    let validationResponse = new ValidationResponse("login");
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let self = this;
        this.af.auth.login(credentials, this.authConfig).then(function (response) {
          console.log(response);
          validationResponse.validRequest = true;
          observer.next(validationResponse);
          observer.complete();
        }).catch(function (error) {
          console.log(error);
          validationResponse.message = error.message;
          observer.next(validationResponse);
          observer.complete();
        });
      });
    }
  }
  //this is another way of login in using promise instead of observable
  public loginWithPromise(credentials){
    return new Promise((resolve, reject)=>{
      this.af.auth.login(credentials, this.authConfig).then(()=>{
        resolve(true);
      }).catch((err)=>{
        reject(err);
      })
    });
  }

  public updateUserProfile(profile) {
    var self=this;
    return this.firebaseAuth.currentUser.updateProfile(profile);
    
  }

  public register(credentials) {
    let validationResponse = new ValidationResponse("register");
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let self = this;
        this.af.auth.createUser(credentials).then(function (response) {
          console.log(response);
          validationResponse.validRequest = true;
          observer.next(validationResponse);
          observer.complete();
        }).catch(function (error) {
          console.log(error);
          validationResponse.message = error.message;
          observer.next(validationResponse);
          observer.complete();
        });
      });
    }
  }
  public reset(credentials) {
    let validationResponse = new ValidationResponse("reset");
    if (credentials.email === null) {
      return Observable.throw("Please insert email");
    } else {
      return Observable.create(observer => {

        this.firebaseAuth.sendPasswordResetEmail(credentials.email).then(function () {
          console.log("Reset email sent");
          validationResponse.validRequest = true;
          observer.next(validationResponse);
          observer.complete();
        }).catch(function (error) {
          console.log(error);
          validationResponse.message = error.message;
          observer.next(validationResponse);
          observer.complete();
        });
      });
    }
  }

  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }
}