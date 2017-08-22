import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
/*
  Generated class for the Users page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
  allusers = [];
  filteredusers = [];
  searchstring = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public userservice: UserService, public events: Events) {

  }

  ionViewWillEnter() {
    this.loadusers();
  }
  loadusers() {
    this.userservice.getallusers().then((res: any) => {
      this.allusers = res;
      this.filteredusers = res;
    })
  }
  searchuser(searchbar) {
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
    this.filteredusers = this.allusers.filter((v) => {
      if ((v.displayName.toLowerCase().indexOf(q.toLowerCase())) > -1) {
        return true;
      }
      return false;
    })
  }
  selectusers() { 
    var users = this.allusers.filter((v) => {
      if (v.selected) {
        return true;
      }
      return false;
    })
    this.events.publish('users_selected',users);
    this.navCtrl.pop();

  }
}
