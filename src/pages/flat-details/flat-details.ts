import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FlatDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flat-details',
  templateUrl: 'flat-details.html',
})
export class FlatDetailsPage {
  flat:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    this.flat = this.navParams.get('flat');
    console.log(this.navParams.get('flat'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlatDetailsPage');
  }
  bookform(){
    
    this.navCtrl.push("BookingsPage");
  }
}
