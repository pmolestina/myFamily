import { Component } from '@angular/core';

/*
  Generated class for the Userinfo component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'userinfo',
  templateUrl: 'userinfo.html'
})
export class UserinfoComponent {

  text: string;

  constructor() {
    console.log('Hello Userinfo Component');
    this.text = 'Hello World';
  }

}
