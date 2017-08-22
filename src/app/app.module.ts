import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { UsersPage } from '../pages/users/users';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage } from '../pages/detail/detail';
import { RegisterPage } from '../pages/register/register';
import { SettingsPage } from '../pages/settings/settings';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
//Components
import { UserinfoComponent } from '../components/userinfo/userinfo';
//Services
import { AuthService } from '../providers/auth-service';
import { ContactService } from '../providers/contact-service';
import { UserService } from '../providers/user-service';

import {firebaseConfig} from './firebase.config';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    UsersPage,
    HomePage,
    LoginPage,
    TabsPage,
    DetailPage,
    RegisterPage,
    SettingsPage,
    ForgotPasswordPage,
    UserinfoComponent
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
    UsersPage,
    HomePage,
    LoginPage,
    TabsPage,
    DetailPage,
    RegisterPage,
    SettingsPage,
    ForgotPasswordPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, 
    AuthService, ContactService, UserService]
})
export class AppModule {}
