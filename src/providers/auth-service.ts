import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods, FirebaseApp } from 'angularfire2';

import 'rxjs/add/operator/map';

export class User {
  id: string;
  name: string;
  email: string;
  lastLogin: string;
  imageUrl: string;
  constructor(id:string, email: string) {
    this.id=id;
    this.email = email;
  }
  
}
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
  currentUser: User;
  firebaseAuth: any;
  userProfile: any;
  get userdisplayName(): string {
    return this.currentUser.name? this.currentUser.name:this.currentUser.email;
  }
  constructor(public af: AngularFire, @Inject(FirebaseApp) fa: any) {
    this.firebaseAuth = fa.auth();
    this.userProfile = fa.database().ref('/userProfile');

  }
  public login(credentials) {
    var authConfig = {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    };
    let validationResponse = new ValidationResponse("login");
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let self = this;
        this.af.auth.login(credentials, authConfig).then(function (response) {
          console.log(response);
          self.currentUser = new User(response.auth.uid,credentials.email);
          self.currentUser.lastLogin = new Date().toISOString();
          
          self.saveUserProfile();

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
  public saveUserProfile() {
    var self = this;
    var userprofile = this.userProfile.child(this.currentUser.id);
    userprofile.on('value', function (snapshot) {
      var currentUser = snapshot.val();
      currentUser.lastLogin=self.currentUser.lastLogin;
      userprofile.set(currentUser);
      self.currentUser=currentUser;
    });

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
          self.currentUser = new User(null,credentials.email);
          //create user profile
          self.userProfile.child(response.auth.uid).set(self.currentUser);
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
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}