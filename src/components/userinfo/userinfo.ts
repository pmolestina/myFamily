import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Camera } from 'ionic-native';

import * as firebase from 'firebase';


@Component({
  selector: 'userinfo',
  templateUrl: 'userinfo.html'
})
export class UserinfoComponent {
  currentUser: any;
  displayName: string;
  constructor(public navCtrl: NavController, private auth: AuthService, public zone: NgZone, public alertCtrl: AlertController) {

    this.currentUser = auth.currentUser;
    this.displayName = auth.currentUser.displayName;
  }

  makeFileIntoBlob(_imagePath) {
    /*return fetch(_imagePath).then(_response => {
      return _response.blob();
    }).then(_blob => {
      return _blob;
    });*/
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
    let alert = this.alertCtrl.create({
      title: 'Edit Display Name',
      inputs: [{
        name: 'displayName',
        placeholder: 'Display Name',
        value: this.displayName
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Save',
        handler: data => {
          if (data.displayName) {
            var profile = { displayName: data.displayName };
            this.zone.run(() => { })
            this.auth.updateUserProfile(profile).then(function () {
              //zone used to update content in page. The work around was to call the line below:
              //self.navCtrl.setRoot(self.navCtrl.getActive().component);
              self.zone.run(() => {
                self.displayName = data.displayName;
              })
              console.log('update successfull ');
            }).catch(function (error) {
              // An error happened.
              console.log(error);
            });
          }
        }
      }
      ]
    })
    alert.present();

  }

  getPicture() {
    var self = this;
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
      var profile = { photoURL: _uploadSnapshot.downloadURL };

      this.auth.updateUserProfile(profile).then(function () {
        console.log('user profile updated successfull ');
        self.navCtrl.setRoot(self.navCtrl.getActive().component);
      }).catch(function (error) {
        // An error happened.
        console.log(error);
      });

    }, (_error) => {
      alert('Error ' + _error.message);
    });
  }
}
