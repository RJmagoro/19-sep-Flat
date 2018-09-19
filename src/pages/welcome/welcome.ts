import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  login: FormGroup;
  display = 0;
  email:string;
  password:string;
  testRadioOpen;
  testRadioResult;

  constructor(private alertCtrl:AlertController,private fb:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setMessage('Please choose one  ');
    alert.setTitle('What are you looking for? ');
 
 
 
    alert.addButton({
 
      text: 'I am looking for Tenants',
 
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.navCtrl.setRoot("SignupPage");
       //this.landLordsignup()
      }});
 
    alert.addButton({
 
      text: 'I am looking for a Flat',
 
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
      //console.log( this.testRadioResult.value);
        this.navCtrl.setRoot("ClientPage");
      
      }});
    //alert.addButton('Cancel');
  /*  alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.navCtrl.setRoot("SignupPage");
      }
    });*/
    alert.present();
 }
  Admin(){

   
    
    // firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(user => {
    //   console.log('sign up page');

     
    // })
    this.navCtrl.push("SignupPage")

      
    }
    client(){
      this.navCtrl.push("ClientPage");

    }
    loginl(){
     this.navCtrl.push("LoginPage")
    }
    reset(){
      this.navCtrl.push("ResetPage");
    }
    logins(){
     this.navCtrl.push("LoginPage");
    }
    //login
    showCheckboxlogin() {
      let alert = this.alertCtrl.create();
      alert.setMessage('Please choose ');
      alert.setTitle('Login as ');
   
   
   
      alert.addButton({
   
        text: 'Tenants Login',
   
        handler: data => {
          this.testRadioOpen = false;
          this.testRadioResult = data;
         
          this.navCtrl.setRoot("TenatLoginPage")
         //this.landLordsignup()
        }});
   
      alert.addButton({
   
        text: 'Client Login',
   
        handler: data => {
          this.testRadioOpen = false;
          this.testRadioResult = data;
        //console.log( this.testRadioResult.value);
          this.navCtrl.setRoot("LoginPage")
        
        }});
      //alert.addButton('Cancel');
    /*  alert.addButton({
        text: 'OK',
        handler: data => {
          this.testRadioOpen = false;
          this.testRadioResult = data;
          this.navCtrl.setRoot("SignupPage");
        }
      });*/
      alert.present();
   }

}
