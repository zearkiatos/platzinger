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
  public conversation:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthenticationService, public userService:UserService, public conversationService:ConversationService) {
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
      type:'text',
      content:this.message
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

}
