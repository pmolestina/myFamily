import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {

  firedata = firebase.database().ref('/appusers');
  constructor() {
    
  }

  getallusers(){
    return new Promise((resolve, reject)=>{
      this.firedata.orderByChild('uid').once('value', (snapshot)=>{
        let userdata = snapshot.val();
        let tempdata =[];
        for(var key in userdata){
          tempdata.push(userdata[key]);
        }
        resolve(tempdata);
      }).catch((err)=>{
        reject(err);
      })
    })
  }
}
