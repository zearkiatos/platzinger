import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation';
import { LoginPage } from '../login/login';
import { IUser } from '../../app/interfaces/IUser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  friends: IUser[];
  constructor(public navCtrl: NavController) {
    let myUser:IUser={
      nick:"Pedro",
      email: "caprilespe@outlook.com",
      friend: true,
      uid: 1
    };

    let Usuario1:IUser={
      nick:"Pedro",
      email: "caprilespe@outlook.com",
      friend: false,
      uid: 1
    };

    let Usuario2:IUser={
      nick:"José",
      email: "jose@outlook.com",
      friend: true,
      uid: 2
    };

    let Usuario3:IUser={
      nick:"Luis",
      email: "luis@outlook.com",
      friend: false,
      uid: 3
    };

    let Usuario4:IUser={
      nick:"Maria",
      email: "maria@outlook.com",
      friend: true,
      uid: 4
    };

    let Usuario5:IUser={
      nick:"Karla",
      email: "karla@outlook.com",
      friend: false,
      uid: 5
    };

    console.log(myUser);

    let users: IUser[] = [
      myUser
    ];
    this.friends = [
      Usuario1,Usuario2,Usuario3,Usuario4,Usuario5
    ];
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

  goToConversation(){
    this.navCtrl.push(ConversationPage);
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

}
