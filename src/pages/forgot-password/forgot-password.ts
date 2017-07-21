import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
 
@Component({
  selector: 'page-main',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  createSuccess = false;
  registerCredentials = {email: '', password: ''};
 
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {}
 
  public reset() {
    this.auth.reset(this.registerCredentials).subscribe(response => {
      if (response.validRequest) {
        this.createSuccess = true;
          this.showPopup("Success", "Password has been reset.");
      } else {
        this.showPopup("Error", "Problem resetting password. " + response.message);
      }
    },
    error => {
      this.showPopup("Error", error);
    });
  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.createSuccess) {
             this.nav.popToRoot();
           }
         }
       }
     ]
    });
    alert.present();
  }
}
