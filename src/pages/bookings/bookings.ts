import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { PEOPLE } from '../../mocks/person.mocks';
/**
 * Generated class for the BookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-bookings',
  templateUrl: 'bookings.html',
})
export class BookingsPage {
  bookings: FormGroup;
name;
fname;
lname;
password;
email;
contactNo;
date;

human={
fname:"",
lname:"",
password:"",
email:"",
  contactNo:"",
  date:"",
  
  
}

  constructor(private fb:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.bookings=this.fb.group({
      fname:['',Validators.required],
      lname:['',Validators.required],
      password:['',Validators.required],
      contactNo:['',Validators.required],
      email:['',Validators.required],
      date:['',Validators.required],
      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingsPage');
  }
  userLogout(){
    firebase.auth().signOut().then(User =>{
      this.navCtrl.push("HomePage");
    });
  } 

  clickListner(){
    firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(user => {
      
      })
    PEOPLE.push({fname:this.fname,lname:this.lname,date:this.date,password:this.password,contactNo:this.contactNo,email:this.email})
    this.navCtrl.push("UserIsBookingPage",{variable: this.name});
  }


}
