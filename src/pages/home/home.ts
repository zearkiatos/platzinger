import { Component, Output } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation';
import { LoginPage } from '../login/login';
import { IUser } from '../../app/interfaces/IUser';
import { UserService } from '../../services/user.service';
import { Status } from '../../enum/status';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Global } from '../../commons/global';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[UserService]
})
export class HomePage {

  @Output() friends:any=[];
  public model:any = {
    user:{}
  }
  status:Status;
  @Output() query:string;
  constructor(public navCtrl: NavController, private userService:UserService, public navParams:NavParams) {
    console.log(this.userService.getUserById(navParams.data['uid']));
    this.model.user= this.userService.getUserById(navParams.data['uid']);
  }

  goToConversation(user:any){
    this.navCtrl.push(ConversationPage,{"user":user});
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

}
