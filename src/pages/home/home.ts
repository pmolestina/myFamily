import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  name = '';
  constructor(public navCtrl: NavController, private auth: AuthService) {
    let info = this.auth.getUserInfo();
    this.name=info.name;
  }
  
}
