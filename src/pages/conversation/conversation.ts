import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IUser } from '../../app/interfaces/IUser';
import { Status } from '../../models/status';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

/**
 * Generated class for the ConversationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html'
})
export class ConversationPage {
  public friend:IUser;
  public user:IUser;
  public status:Status;
  public price:number=76.8874934768364;
  public today:any= Date.now();
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthenticationService, public userService:UserService) {
    this.friend = this.navParams.data['user'];
    this.authService.getStatus().subscribe(
      (data)=>{
        this.userService.getUserById(data.id).valueChanges().subscribe(
          (user:User)=>{
            this.user =user;
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

}
