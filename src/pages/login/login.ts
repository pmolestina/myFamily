import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { TabsPage } from '../tabs/tabs';
 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''};
 
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}
 
  public createAccount() {
    this.nav.push(RegisterPage);
  }
  public forgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }
  public login() {
    let self = this;
    this.showLoading()
    self.auth.login(this.registerCredentials).subscribe(response => {
      if (response.validRequest) {
        setTimeout(() => {
        this.loading.dismiss();
        this.nav.setRoot(TabsPage)
        });
      } else {
        this.showError("Access Denied." + response.message);
      }
    },
    error => {
      this.showError(error);
    });
  }
  public loginWithPromise(){
    let self = this;
    self.auth.loginWithPromise(this.registerCredentials).then((res:any)=>{
      if(!res.code)
        this.nav.setRoot(TabsPage)
      else
        alert(res);
    });
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
 
  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}