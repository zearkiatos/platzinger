import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    let c:number = 1;
    let b:number = 2;
    let e:string = "1";
    let f:string = "2";
    let g:boolean = true;
    let h:object = {};
    console.log(g);
    console.log(h);

    let i = [c,b,e,f,g,h];

    console.log(i);

    let j: boolean [] = [true,g];

    console.log(j);

    let k: object[] = [{},h];

    let l: any[] = [1,'string',{},[]];
  }

  goToConversation(){
    this.navCtrl.push(ConversationPage);
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

}
