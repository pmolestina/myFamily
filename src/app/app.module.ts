import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage } from '../pages/detail/detail';
<<<<<<< HEAD
=======

>>>>>>> 206b5cd21b14fc673352c6fd07bd62fdba84a1e0
import { RegisterPage } from '../pages/register/register';
import { SettingsPage } from '../pages/settings/settings';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
//services
import { AuthService } from '../providers/auth-service';
import { ContactService } from "../providers/contact-service";
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
//Services
import { AuthService } from '../providers/auth-service';
import { ContactService } from '../providers/contact-service';

import {firebaseConfig} from './firebase.config';

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
    SettingsPage,
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
    SettingsPage,
    ForgotPasswordPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, ContactService]
})
export class AppModule {}
