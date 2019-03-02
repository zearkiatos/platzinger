import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IUser } from '../../app/interfaces/IUser';

/**
 * Generated class for the ConversationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {
  public friend:IUser;
  public price:number=76.8874934768364;
  public today:any= Date.now();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.friend = this.navParams.data['user'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

  goBack(){
    this.navCtrl.pop();
  }

}
