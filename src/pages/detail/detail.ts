import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'detail.html'
})
export class DetailPage {
  detail : string
  constructor(
      public params: NavParams
  
    ) {
        this.detail= this.params.get('contact');
    }
  
}
