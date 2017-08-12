import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { App } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { Camera } from 'ionic-native';
import 'whatwg-fetch';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  currentUser: any;
  name: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth: AuthService, public app: App) {

    this.currentUser = auth.currentUser;
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
    var fileName = this.currentUser.uid + '.jpg';
    return new Promise((resolve, reject) => {
      var fileRef = firebase.storage().ref('images/' + fileName);
      var uploadTask = fileRef.put(_imageBlob);

      uploadTask.on('state_changed', (_snapshot) => {
        console.log('snapshot progress ' + _snapshot);
      }, (_error) => {
        reject(_error);
      }, () => {
        resolve(uploadTask.snapshot);
      });
    });
  }
  updatename() {
    var self = this;
    var profile = { displayName: 'test new' };
    this.auth.updateUserProfile(profile).then(function () {
      console.log('update successfull ');
      self.navCtrl.setRoot(self.navCtrl.getActive().component);
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }

  getPicture() {
    var self=this;
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
      return this.uploadToFirebase(_imageBlob);
    }).then((_uploadSnapshot: any) => {
      console.log('file uploaded successfully ' + _uploadSnapshot.downloadURL)
      console.log('saving to user profile');
      var profile = { photoURL: _uploadSnapshot.downloadURL };
      this.auth.updateUserProfile(profile).then(function () {
        console.log('update successfull ');
        self.navCtrl.setRoot(self.navCtrl.getActive().component);
      }).catch(function (error) {
        // An error happened.
        console.log(error);
      });;
    }, (_error) => {
      alert('Error ' + _error.message);
    });
  }
}
