import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage } from '../pages/detail/detail';
import { AuthService } from '../providers/auth-service';
import { RegisterPage } from '../pages/register/register';
import { LogoutPage } from '../pages/logout/logout';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig={
    apiKey: "AIzaSyDgFG2F9dAG2qcD-gFuRgFrGK8xWdN7OTY",
    authDomain: "thefamily-eb9bb.firebaseapp.com",
    databaseURL: "https://thefamily-eb9bb.firebaseio.com",
    storageBucket: "thefamily-eb9bb.appspot.com",
    messagingSenderId: "91662480324"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage,
    DetailPage,
    RegisterPage,
    LogoutPage,
    ForgotPasswordPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage,
    DetailPage,
    RegisterPage,
    LogoutPage,
    ForgotPasswordPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
})
export class AppModule {}
