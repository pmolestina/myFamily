import { Injectable, Inject } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods, FirebaseApp } from 'angularfire2';

import 'rxjs/add/operator/map';
 
export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
export class ValidationResponse {
  validRequest: boolean;
  message: string;
  requestType: string;
 
  constructor(requestType: string) {
    this.requestType=requestType;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;
  firebaseAuth: any;
  constructor(public af: AngularFire, @Inject(FirebaseApp) fa : any){
    this.firebaseAuth= fa.auth();

  }
  public login(credentials) {
    let validationResponse = new ValidationResponse("login");
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let self = this;
        this.af.auth.login(
           {
              provider: AuthProviders.Password,
              email: credentials.email,
              password: credentials.password
            },
            {
              provider: AuthProviders.Password,
              method: AuthMethods.Password
            }).then(function (response){
              console.log(response);
              self.currentUser = new User(credentials.email, credentials.email);
              validationResponse.validRequest=true;
              observer.next(validationResponse);
              observer.complete();
        }).catch(function(error){
          console.log(error);
          validationResponse.message=error.message;
          observer.next(validationResponse);
          observer.complete();
        });
      });
    }
  }
 
  public register(credentials) {
    let validationResponse = new ValidationResponse("register");
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else 
    {
      return Observable.create(observer => {
        let self = this;
        this.af.auth.createUser(credentials).then(function (response){
              console.log(response);
              self.currentUser = new User(credentials.email, credentials.email);
              validationResponse.validRequest=true;
              observer.next(validationResponse);
              observer.complete();
        }).catch(function(error){
          console.log(error);
          validationResponse.message=error.message;
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
    } else 
    {
      return Observable.create(observer => {
        
        this.firebaseAuth.sendPasswordResetEmail(credentials.email).then(function (){
              console.log("Reset email sent");
              validationResponse.validRequest=true;
              observer.next(validationResponse);
              observer.complete();
        }).catch(function(error){
          console.log(error);
          validationResponse.message=error.message;
          observer.next(validationResponse);
          observer.complete();
        });
      });
    }
  }
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}