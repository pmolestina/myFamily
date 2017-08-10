import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { SettingsPage } from '../settings/settings';
import { AuthService } from '../../providers/auth-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = SettingsPage;
  
  constructor(private auth: AuthService) {
    
  }
  isAuthenticated(){
    if (this.auth.currentUser==undefined){
      return false;
    }
    return true;
  }

}
