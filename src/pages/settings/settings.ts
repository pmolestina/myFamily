import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UsersPage } from '../users/users';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, 
    private auth: AuthService, public app: App, public events: Events) {
      this.events.subscribe('users_selected',(users)=>{
        console.log(users);
      })

  }

  logout() {
    console.log('login out');
    this.auth.logout().subscribe(succ => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }
  selectusers(){
    this.navCtrl.push(UsersPage);
  }
}
