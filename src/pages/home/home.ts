import { Component, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation';
import { LoginPage } from '../login/login';
import { IUser } from '../../app/interfaces/IUser';
import { UserService } from '../../services/user.service';
import { Status } from '../../enum/status';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[UserService]
})
export class HomePage {

  friends:IUser[];
  status:Status;
  @Output() query:string;
  constructor(public navCtrl: NavController, private userService:UserService) {
    this.friends = this.userService.getFriends();
    // let c:number = 1;
    // let b:number = 2;
    // let e:string = "1";
    // let f:string = "2";
    // let g:boolean = true;
    // let h:object = {};
    // console.log(g);
    // console.log(h);

    // let i = [c,b,e,f,g,h];

    // console.log(i);

    // let j: boolean [] = [true,g];

    // console.log(j);

    // let k: object[] = [{},h];

    // let l: any[] = [1,'string',{},[]];
  }

  goToConversation(user:any){
    this.navCtrl.push(ConversationPage,{"user":user});
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

}
