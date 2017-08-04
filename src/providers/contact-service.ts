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
  getContacts(searchTerm: string){
    var result= {list:null,lastKey:''} ;
    var list =this.af.database.list('/contacts',{
      query:{
        orderByChild:'name',
        limitToFirst: 1
      }
    }).map(_items => _items.filter(item => item.name.toLowerCase().indexOf(searchTerm.toLowerCase())>-1));
    list.subscribe(data=>{
      if(data.length>0)
        result.lastKey=data[0].$key;
      else
        result.lastKey='';
    });    

    result.list= this.af.database.list('/contacts',{
      query:{
        orderByChild:'name',
        limitToFirst: 100
      }
    }).map(_items => _items.filter(item => item.name.toLowerCase().indexOf(searchTerm.toLowerCase())>-1)) as FirebaseListObservable<any>;

    return result as Result;
  }
}

interface Result{
  list:any;
  lastKey:string;
}