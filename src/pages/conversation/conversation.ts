import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IUser } from '../../app/interfaces/IUser';
import { Status } from '../../models/status';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ConversationService } from '../../services/coversation.service';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthenticationService, public userService:UserService, public conversationService:ConversationService) {
    this.friend = this.navParams.data['user'];
    this.authService.getStatus().subscribe(
      (data:any)=>{
        this.userService.getUserById(this.friend.id).valueChanges().subscribe(
          (user:User)=>{
            this.user =user;
            let idsArray = [this.user.id, this.friend.id];
            this.conversationId = idsArray.join('||');
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
    const messageObject: any= {
      uid:this.conversationId,
      timeStamp:Date.now(),
      sender:this.user.id,
      receiver: this.friend.id,
      type:'text',
      content:this.message
    };
    console.log(messageObject);
    this.conversationService.postConversation(messageObject).then((data:any)=>{
      this.message = '';
    }).catch((error)=>{
      console.log(error);
    });
  }

}
