import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { NavController } from 'ionic-angular';
import { ConversationPage } from '../../pages/conversation/conversation';

/**
 * Generated class for the FriendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'friend',
  templateUrl: 'friend.html'
})
export class FriendComponent implements OnInit {

  text: string;
  @Input() public uid:string;
  public friend: User;
  constructor(private userService:UserService, private navCtrl:NavController) {
    console.log('Hello FriendComponent Component');
    this.text = 'Hello World';
  }
  
  ngOnInit(): void {
    this.userService.getUserById(this.uid).valueChanges().subscribe((data:User)=>{
      this.friend = data;
      console.log(this.friend);

    },(error)=>{
      console.log(error);
    });
    console.log(this.uid);
  }

  goToConversation(user:any){
    this.navCtrl.push(ConversationPage,{"user":user});
  }

}
