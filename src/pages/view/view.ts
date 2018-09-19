import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebaseStorage;
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
  firebaseStorage: any;
  imageUri;
  details;Item;
  pictures;itemObject;
  loading;title;
  loadingCtrl;description;
  uid ;profilePicture;book;
  flat;expire;start;
  email;downloadUrls;

  constructor(private camera: Camera,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
  }
  takePicture(){
    console.log("camera open");
    
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum : true,
      cameraDirection : 0,
      targetWidth : 640,
      targetHeight : 640
    };

    this.camera.getPicture(options).then((imageData) => {
      
      this.imageUri = 'data:image/jpeg;base64,' + imageData;
      this.details =  "img" + Date.now().toString() + ".jpeg";

      this.pictures.push(
        {
          details : this.details,
          uri : this.imageUri
        }
      );
      console.log("new image added");
      console.log(this.pictures);
      
     }, (err) => {
      
      console.log(err);
     });
    
  }
  uploadImage(){
    
    this.loading = this.loadingCtrl.create({
      content: 'Uploading files, Please wait...'
    });
  
    this.loading.present();

    for(let i = 0 ; i < this.pictures.length; i++){

      console.log("uploading image #" + (i + 1));

      var ref = this.firebaseStorage.ref('pictures/' + this.uid  + '/' + this.pictures[i].details );
      ref.putString(
      this.pictures[i].uri, 'data_url').then(
       
        snapshot => {
          ref.getDownloadURL().then((url) =>{
            this.downloadUrls.push(url);
            
            console.log("url #" + (i +1) + "pushed to array. array size : " + this.downloadUrls.length);
            if(this.pictures.length == this.downloadUrls.length){
              this.saveToDB();
            }
          })
    
        }
      ).catch(
        err => {
          console.log("upload failed");
          console.log(err);
          this.loading.dismiss();
          
        }
      );
      console.log("done uploading image #" + (i + 1));
    }
    
  } 
  saveToDB() {
    this.itemObject = new this.Item();
    this.itemObject.setName(this.title);
    this.itemObject.setDescription(this.description);
    this.itemObject.setType(this.flat);
    this.itemObject.setImageUri(this.downloadUrls);
      
  

    this.book.setStartDate(new Date());
    this.book.setExpireDate(this.expire);
    

    firebase.database().ref('/Upload/').push(this.book); 

    firebase.database().ref('Upload/' ).push(
      {
        uid: this.uid,
        username : this.email,
        imgUrl : this.downloadUrls,
        title : this.title,
        description : this.description,
        FType : this.flat,
        start : this.start,
        profilePicture : this.profilePicture,
        expire : this.expire
      }
    );
  }
  // book(){
  //   this.navCtrl.push("BookingsPage");
  // }
  cancel(){
    this.navCtrl.push("CancelPage");
  }
  userLogout(){
    firebase.auth().signOut().then(User =>{
      this.navCtrl.push("HomePage");
    });
  
  }
  Login(){
    this.navCtrl.push("LoginPage")
  }



}
