import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { App } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthService, public app: App) {}

  logout() {
    console.log('login out');
    this.auth.logout().subscribe(succ => {
        this.app.getRootNav().setRoot(LoginPage);
    });
  }

}
