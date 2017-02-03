import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  constructor(private nav: NavController, private auth: AuthService, public app: App) {
    this.logout();
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
        this.app.getRootNav().setRoot(LoginPage);
    });
  }
}
