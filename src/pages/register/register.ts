import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-main',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { email: '', password: '', displayName: '' };

  constructor(private nav: NavController, private auth: AuthService,
    private alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {

  }

  public register() {
    var toaster = this.toastCtrl.create({
      duration:3000,
      position: 'bottom'
    })
    if(this.registerCredentials.password.length <6){
      toaster.setMessage('Password needs at least 6 characters');
      toaster.present();
      return;
    }
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.auth.register(this.registerCredentials).subscribe(response => {
      loader.dismiss();
      if (response.validRequest) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created. You can login now with your credentials.");
      } else {
        this.showPopup("Error", "Problem creating account. " + response.message);
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