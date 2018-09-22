import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController ,MenuController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


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
  chocolate = 0;
  display = 0;
  email:string;
  password:string;
  testRadioOpen;
  testRadioResult;
  flatList = [];
  count:number = 0;

  constructor(public menuCtrl: MenuController,public loadingCtrl: LoadingController,private alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
  

  console.log(this.navParams.get("user"));
    this.getImage();
    
    
    
  }
  presentLoading(count:number) {
    const loader = this.loadingCtrl.create({
      spinner:"bubbles",
      content: "Please wait...",
      duration: count
    });
    loader.present();
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
     this.navCtrl.push("LoginPage");
     this.chocolate = 1;
    }
    reset(){
      this.navCtrl.push("ResetPage");
    }
    logins(){
     this.navCtrl.push("LoginPage");
     this.chocolate = 1;
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
   //this.count =0;
    firebase.database().ref('/Adds/').on('value', (snapshot) =>
  {
     
    var counter = 3000;
    this.presentLoading(counter+this.count);
    snapshot.forEach((snap) => 
    { 
      //Initializing Item;
      /*this.item._key = snap.key;
      this.item.name = snap.val().c_itemName;*/
      //Adding Item to itemsList
        
      this.count+=1000;
      counter = counter+this.count;
     
      this.flatList.push({_key : snap.key, fname: snap.val().fNAme, Address: snap.val().Address, Price : snap.val().Price, downloadUrl: snap.val().downloadUrl});
     console.log(snap.val().downloadUrl);
     console.log(this.flatList);
   
      return false;
    });
    
    console.log("count = "+this.count);
  });
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  landLordSignUp(){
    
     this.navCtrl.setRoot("SignupPage");
    this.chocolate =1;
  }

  ve(){
    this.chocolate =1;
  }
  getFlatDetails(flat:any){
console.log(flat.fname);

    this.navCtrl.push("FlatDetailsPage",{flat:flat});
  }
 openMenu()
{
  this.menuCtrl.open();
}

closeMenu(){
  this.menuCtrl.close();
}
}
