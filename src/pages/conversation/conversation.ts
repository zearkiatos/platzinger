import { Component } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { IUser } from '../../app/interfaces/IUser';
import { Status } from '../../models/status';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ConversationService } from '../../services/coversation.service';
import { ConversationTypeEnum } from '../../utils/conversationTypeEnum';
import { CameraOptions, Camera, PictureSourceType } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ConversationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
  providers:[UserService,AuthenticationService, ConversationService]
})
export class ConversationPage {
  public friend:IUser;
  public user:IUser;
  public conversationId:any;
  public status:Status;
  public price:number=76.8874934768364;
  public today:any= Date.now();
  public message:string;
  public conversation:any;
  public pictureId:number;
  public location:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthenticationService, public userService:UserService, public conversationService:ConversationService,
    private camera:Camera, private toastCtrl:ToastController, private geolocation:Geolocation, private httpClient:HttpClient) {
    this.friend = this.navParams.data['user'];
    this.authService.getStatus().subscribe(
      (data:any)=>{
        this.userService.getUserById(data.uid).valueChanges().subscribe(
          (user:User)=>{
            this.user =user;
            let idsArray = [this.user.id, this.friend.id];
            this.conversationId = idsArray.join('||');
            this.getConversation();
          },
          (error)=>{
            console.log(error);
          }
        );
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

  goBack(){
    this.navCtrl.pop();
  }

  sendMessage(){
    const messageObject= {
      uid:this.conversationId,
      timestamp:Date.now(),
      sender:this.user.id,
      receiver: this.friend.id,
      type:ConversationTypeEnum.Text,
      content:this.message
    };
    console.log(messageObject);
    this.conversationService.postConversation(messageObject).then((data)=>{
      this.message = '';
    }).catch((error)=>{
      console.log(error);
    });
  }

  sendMessageMultimedia(content:string, type:ConversationTypeEnum){
    const messageObject= {
      uid:this.conversationId,
      timestamp:Date.now(),
      sender:this.user.id,
      receiver: this.friend.id,
      type:type,
      content:content
    };
    console.log(messageObject);
    this.conversationService.postConversation(messageObject).then((data)=>{
      this.message = '';
    }).catch((error)=>{
      console.log(error);
    });
  }

  getConversation(){
    this.conversationService.getById(this.conversationId).valueChanges().subscribe(
      (data)=>{
        this.conversation=data;
      },
      (error)=>{
        console.log(error);
      });
  }

  getUserNickById(id: number) {
      if(id ===this.friend.id){
          return this.friend.nick;
      }
      else{
          return this.user.nick;
      }
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

          if(cameraOptions.sourceType === PictureSourceType.CAMERA){
            this.sendMessageMultimedia(url,ConversationTypeEnum.Picture);
          }
          else if(cameraOptions.sourceType === PictureSourceType.PHOTOLIBRARY){
            this.sendMessageMultimedia(url,ConversationTypeEnum.Image);
          }

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
        console.log(data);
        this.sendMessageMultimedia(this.location.coords.latitude+','+this.location.coords.longitude,ConversationTypeEnum.Location);
      }, (error)=>{
        console.log(error);
      });
    }).catch((error)=>{
      console.log(error);
    })
  }



}
