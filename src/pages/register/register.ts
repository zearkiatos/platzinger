import { AuthenticationService } from './../../services/authentication.service';
import { HomePage } from './../home/home';
import { Component, Output } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Status } from '../../enum/status';
import { Functions } from '../../utils/funtions';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers:[UserService, AuthenticationService]
})
export class RegisterPage {
  @Output() public user:User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private userService:UserService, private authenticationService:AuthenticationService) {
    this.user = new User();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  uploadPhoto($event):void{
    this.user.photo = $event.target.files[0];

     Functions.getBase64(this.user.photo).then((result)=>{
       console.log(result);
       this.user.photo= result;
      return result;
    });
  }

    registerUser(){
      this.authenticationService.registerWithEmail(this.user.email,this.user.password).then(
        (data)=>{
          console.log(data);
          console.log(data.user.uid);
          this.user.id = data.user.uid;
          this.userService.createUser(this.user);
          this.navCtrl.push(HomePage,{'user':this.user});
        },
        (error)=>{
          alert("Ocurrio un error");
          console.log(error);
        }
        );
  }

}
