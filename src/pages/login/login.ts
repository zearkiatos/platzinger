import { HomePage } from './../home/home';
import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, Output } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { Global } from '../../commons/global';
import { Status } from '../../enum/status';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[AuthenticationService, UserService]
})
export class LoginPage {

  @Output() public model:any ={
    user:{
      email:"",
      password:""
    },
    newUser:{
      id:"",
      email:"",
      name:"",
      photo:"",
      lastName:"",
      password:"",
      nick:"",
      status:Status.Online
    }
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private authenticationService:AuthenticationService,private userService:UserService, public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  goBack(){
    this.navCtrl.pop();
  }

  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
    this.authenticationService.loginWithEmail(this.model.user.email,this.model.user.password).then(
      (data)=>{
        this.navCtrl.push(HomePage,{'uid':data.user.uid});
      },
      (error)=>{
        alert("Ocurrio un error");
        console.log(error);
      }
      );
  }

  loginWithFacebook(){
    this.authenticationService.loginWithFacebook().then((response)=>{
      console.log(response.user.uid);
      this.model.newUser.id = response.user.uid.toString();
      this.model.newUser.email = response.user.email.toString();
      this.model.newUser.name  = response.user.displayName.toString();
      this.model.newUser.photo = response.user.photoURL.toString();
      this.model.newUser.lastName = " ";
      this.model.newUser.nick = " ";
      this.model.newUser.password = " ";
      this.model.newUser.status = Status.Online;
      Global.userAuth =  this.model.newUser;
      this.userService.createUser( this.model.newUser);
      this.navCtrl.push(HomePage,{'uid':this.model.newUser.id });
      this.viewCtrl.dismiss();
      // localStorage.setItem("loginData",JSON.stringify(response));
    });
  }
  

}
