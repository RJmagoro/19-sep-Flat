import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: FormGroup;
  display = 0;
  email:string;
  password:string;
  ids;

  constructor(private fb:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.login = this.fb.group({
     
      email:['',Validators.compose([Validators.maxLength(25),Validators.pattern('^[a-zA-Z0-9@]'),Validators.required])],
      password:['',Validators.compose([Validators.minLength(8),Validators.pattern('^[a-zA-Z0-9!@#$%^&*]'),Validators.required])]
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  logins(){
    firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(user => {
      console.log("user ===="+user);
      
        this.navCtrl.setRoot("WelcomePage",{user:user});
     
    })
    
    
   }
   reset(){
    this.navCtrl.push("ResetPage");
     
   }
   ViewPage(){
     this.navCtrl.push("ViewPage")
   }
   loginWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(User =>{
      this.ids = User;
      console.log("user ===="+ this.ids);
      this.navCtrl.push("WelcomePage",{user:this.ids});
    })
   }

}
