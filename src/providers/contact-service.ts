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

  constructor(private af: AngularFire) {
    console.log('Hello Contacts Provider');
  }
  getContacts(){
    return this.af.database.list('/contacts',{
      query:{
        orderByChild:'name',
        limitToFirst: 10
      }
    });
  }
}
