import { AuthenticationService } from './../../services/authentication.service';
import { HomePage } from './../home/home';
import { Component, Output } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Status } from '../../enum/status';
import { Functions } from '../../utils/funtions';
import { UserService } from '../../services/user.service';

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
  @Output() public model:any = {
    user:{
      id:0,
      name:"",
      lastName:"",
      email:"",
      nick:"",
      photo:"",
      password:"",
      status:Status.Online

    }
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private userService:UserService, private authenticationService:AuthenticationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  uploadPhoto($event):void{
    this.model.user.photo = $event.target.files[0];

     Functions.getBase64(this.model.user.photo).then((result)=>{
       console.log(result);
       this.model.user.photo= result;
      return result;
    });
  }

    registerUser(){
      this.authenticationService.registerWithEmail(this.model.user.email,this.model.user.password).then(
        (data)=>{
          console.log(data);
          console.log(data.user.uid);
          this.model.user.id = data.user.uid;
          this.userService.createUser(this.model.user);
          this.navCtrl.push(HomePage,{'user':this.model.user});
        },
        (error)=>{
          alert("Ocurrio un error");
          console.log(error);
        }
        );
  }

}
