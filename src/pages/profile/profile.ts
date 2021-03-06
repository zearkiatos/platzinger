import { HttpClient } from '@angular/common/http';
import {Geolocation} from '@ionic-native/geolocation';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Button, ToastController } from 'ionic-angular';
import { IUser } from '../../app/interfaces/IUser';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers:[AuthenticationService, UserService]
})
export class ProfilePage {
  public user:User;
  public location:any;
  private pictureId:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthenticationService, private userService: UserService, private alertCtrl:AlertController, private camera:Camera, private toastCtrl:ToastController, private geolocation:Geolocation, private httpClient:HttpClient) {
    this.authService.getStatus().subscribe((data)=>{
      this.userService.getUserById(data.uid).valueChanges().subscribe((user:any)=>{
        this.user = user;
        console.log(this.user);
      }, 
      (error)=>{
        console.log(error);
      });
    },
    (error)=>{
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  saveData(){

    this.userService.editUser(this.user).then((data)=>{
      let alert = this.alertCtrl.create({
        title:"Mensaje",
        message:"Datos Actualizados con éxito.",
        buttons:["Aceptar"]  
      });
      alert.present();
    }).catch((error)=>{
      let alertError = this.alertCtrl.create({
        title:"Mensaje",
        message:"Ocurrio un error al editar los datos. Error: "+error,
        buttons:["Aceptar"]  
      });
      alertError.present();
      console.log(error);
    });
  }

  async takePicture(source:string){
    try{
      let cameraOptions: CameraOptions={
        quality:50,
        targetWidth:800,
        targetHeight:800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit:true,
      };

      cameraOptions.sourceType = (source === 'camera')?this.camera.PictureSourceType.CAMERA: this.camera.PictureSourceType.PHOTOLIBRARY;

      const result = await this.camera.getPicture(cameraOptions);

      const image = 'data:image/jpeg;base64,'+result;
      this.pictureId = Date.now();
      this.userService.uploadPicture(this.pictureId+'.jpg',image).then((data)=>{
        this.userService.getDownloadURL(this.pictureId+'.jpg').subscribe((url)=>{
          this.user.photo = url;
          let toast = this.toastCtrl.create({
            message:"Foto Subida",
            duration: 3000,
            position:"bottom"
          });
          toast.present();
        },(error)=>{
          console.log(error);
        });
      }).catch((error)=>{
        console.log(error);
      });
      console.log(image);
    }
    catch(e){
      console.error(e);
    }
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((response)=>{
      console.log(response);
      this.location = response;
      this.httpClient.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+this.location.coords.latitude+","+this.location.coords.longitude).subscribe((data)=>{
        console.log(data)
      }, (error)=>{
        console.log(error);
      });
    }).catch((error)=>{
      console.log(error);
    })
  }

}
