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
    console.log("Ok");
  }

  goToConversation(){
    this.navCtrl.push(ConversationPage);
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

}
