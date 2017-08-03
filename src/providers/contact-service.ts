import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import 'rxjs/add/operator/map';

/*
  Generated class for the Contacts provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContactService {
  contacts: FirebaseListObservable<any[]>;
  constructor(private af: AngularFire) {
    
  }
  getContacts(){
    this.contacts = this.af.database.list('/contacts',{
      query:{
        orderByChild:'name',
        limitToFirst: 10
      }
    }) as FirebaseListObservable<ContactModel[]>;

    return this.contacts;
  }
}
export interface ContactModel{
  $key?:string;
  name?:string;
  email?:string;
  phone?:string;
}
