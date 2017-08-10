import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { App } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { Camera } from 'ionic-native';
import 'whatwg-fetch';
import {AngularFire} from 'angularfire2';
import * as firebase from 'firebase';
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  currentUser: any;
  displayName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth: AuthService, public app: App) { 
      this.currentUser=auth.currentUser;
      this.displayName=auth.userdisplayName;
    }

  logout() {
    console.log('login out');
    this.auth.logout().subscribe(succ => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }
  makeFileIntoBlob(_imagePath) {
    return fetch(_imagePath).then(_response => {
      return _response.blob();
    }).then(_blob => {
      return _blob;
    });
  }
  uploadToFirebase(_imageBlob) {
    var fileName =  this.auth.currentUser.id + '.jpg';
    return new Promise((resolve, reject)=>{
      var fileRef= firebase.storage().ref('images/' + fileName);
      var uploadTask = fileRef.put(_imageBlob);

      uploadTask.on('state_changed',(_snapshot)=>{
        console.log('snapshot progress ' + _snapshot);
      },(_error)=>{
        reject(_error);
      },()=>{
        resolve(uploadTask.snapshot);
      });
    });
  }
  getPicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      targetHeight: 640,
      correctOrientation: true
    }).then((_imagePath) => {
      console.log("Image path " + _imagePath);
      return this.makeFileIntoBlob(_imagePath);
    }).then((_imageBlob) => {
      console.log('got image blob ' + _imageBlob);
      this.uploadToFirebase(_imageBlob);
    }).then((_uploadSnapshot: any)=>{
      console.log('file uploaded successfully ' + _uploadSnapshot.downloadURL)
      console.log('saving to user profile');
      this.auth.saveUserProfilePicture(_uploadSnapshot.downloadURL);
    }, (_error) => {
      alert('Error ' + _error.message);
    });
  }
}
