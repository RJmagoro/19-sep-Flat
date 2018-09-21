import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';



/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  
  display = 0;
  email:string;
  password:string;
  testRadioOpen;
  testRadioResult;
  flatList = [];

  constructor(private alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
    this.getImage();
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
    login(){
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
   getImage(){

    firebase.database().ref('/Adds/').on('value', (snapshot) =>
  {
    snapshot.forEach((snap) => 
    { 
      //Initializing Item;
      /*this.item._key = snap.key;
      this.item.name = snap.val().c_itemName;*/
      //Adding Item to itemsList
      this.flatList.push({_key : snap.key, fname: snap.val().fNAme, Address: snap.val().Address, Price : snap.val().Price, downloadUrl: snap.val().downloadUrl});
     console.log(snap.val().downloadUrl);
     console.log(this.flatList);
      return false;
    });
    console.log(this.flatList);
  });
  }
  
  landLordSignUp(){
    this.navCtrl.push("SignupPage");
  }
  getFlatDetails(flat:any){
console.log(flat.fname);

    this.navCtrl.push("FlatDetailsPage",{flat:flat});
  }

}
