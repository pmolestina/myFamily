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
  getContacts(search: string, limit){
    var searchTerm=search.toLowerCase();
    var result= {list:null,lastKey:'', queryable:null} ;
   
    var list =this.af.database.list('/contacts',{
      query:{
        orderByChild:'lowercaseName',
        limitToLast: 1,
        startAt:searchTerm,
        endAt:searchTerm + '\uf8ff'
      }
    });
    
    list.subscribe(data=>{
      if(data.length>0)
        result.lastKey=data[0].$key;
      else
        result.lastKey='';
    });    

    result.list= this.af.database.list('/contacts',{
      query:{
        orderByChild:'lowercaseName',
        limitToFirst: limit,
        startAt:searchTerm,
        endAt:searchTerm + '\uf8ff'
      }
    });
    result.list.subscribe((data)=>{
      if (data.length > 0) {
              // If the last key in the list equals the last key in the database
              if (data[data.length - 1].$key === result.lastKey) {
                  result.queryable = false;
              } else {
                  result.queryable = true;
              }
          }
    })
    //.map(_items => _items.filter(item => item.name.toLowerCase().indexOf(searchTerm.toLowerCase())>-1)) as FirebaseListObservable<any>;

    return result as Result;
  }
}

interface Result{
  list:any;
  lastKey:string;
}