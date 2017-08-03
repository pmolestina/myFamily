import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import {ContactService, ContactModel} from '../../providers/contact-service';

import { NavController, AlertController, 
        ActionSheetController, ItemSliding, LoadingController 
        } from 'ionic-angular';
import {DetailPage} from '../detail/detail';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contacts: any;
  filteredContacts: any;
  searchTerm: string = '';
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController, 
              af: AngularFire,
              public actionSheetCtrl: ActionSheetController,
              public loadingCtrl: LoadingController,
              private contactService:ContactService
              ) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    /* loading.present();
    this.contacts = af.database.list('/contacts',{
      query:{
        orderByChild:'name',
        limitToFirst: 10
      }
    }) as FirebaseListObservable<Contact[]>;;
    this.filterContacts();
    loading.dismiss(); */
  }
  ngOnInit(){
    console.log('init..');
    this.contactService.getContacts().subscribe(contacts  => {
      this.contacts=contacts;
      this.filterContacts();
    });
  }

  //had some issues with filtering list because initial filter was returning another list
  //had to do another filter inside, saw in online tutorial
  //https://www.youtube.com/watch?v=8E-dueHCd2o   31:08
  filterContacts(){
    this.filteredContacts= this.contacts
    .map(items=>{
      const filtered=items
        .filter(item=>item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1);
      return filtered;
    })
    .do(item=> console.log(item));
  }
  addContact(){
    let prompt = this.alertCtrl.create({
      title: 'Contact Name',
      message: "Enter a name for this contact",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'email',
          placeholder: 'Email'
        },
        {
          name: 'phone',
          placeholder: 'Phone',
          type: "tel"
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.contacts.push({
              name: data.name, email: data.email, phone: data.phone
            });
          }
        }
      ]
  });
  prompt.present();
  }
 
  removeContact(contactId: string, slidingItem: ItemSliding){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'destructive',
          handler: () => {
            this.contacts.remove(contactId);
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No clicked');
            slidingItem.close();
          }
        }
      ]
    });
    actionSheet.present();
  }

  updateContact(contact){
    let prompt = this.alertCtrl.create({
      title: 'Contact',
      message: "Update the contact information",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: contact.name
        },
        {
          name: 'email',
          placeholder: 'Email',
          value: contact.email
        },
        {
          name: 'phone',
          placeholder: 'Phone',
          value: contact.phone
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.contacts.update(contact.$key, {
              name: data.name, email:data.email, phone: data.phone
            });
          }
        }
      ]
    });
    prompt.present();
  }
  details(contact, slidingItem: ItemSliding){
    slidingItem.close();
    this.navCtrl.push(DetailPage,{'contact': contact});
  }
}
interface Contact{
  $key?:string;
  name?:string;
  email?:string;
  phone?:string;
}
