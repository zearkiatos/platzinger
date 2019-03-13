import { HomePage } from './../home/home';
import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, Output, ɵConsole } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { Global } from '../../commons/global';
import { Status } from '../../enum/status';
import { User } from '../../models/user';
import { database } from 'firebase';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl:ToastController, private authenticationService:AuthenticationService,private userService:UserService, public viewCtrl:ViewController) {
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
        let toast = this.toastCtrl.create({
          message:'Bienvenido',
          duration:3000,
          position:'bottom'
        });
        toast.present();
      },
      (error)=>{
        alert("Ocurrio un error");
        console.log(error);
      }
      );
  }

  loginWithFacebook(){
    this.authenticationService.loginWithFacebook().then((response:any)=>{
      console.log(response);
      if(response.additionalUserInfo.isNewUser){
        const user:User = {
          nick : response.additionalUserInfo.profile.first_name +" "+response.additionalUserInfo.profile.last_name,
          active: true,
          friend:true,
          lastName:response.additionalUserInfo.profile.last_name,
          name:response.additionalUserInfo.profile.first_name,
          photo:response.additionalUserInfo.profile.picture.data.url,
          status : Status.Online,
          id: response.user.uid,
          email:response.additionalUserInfo.profile.email
        };
        console.log(user);
        this.userService.createUser(user);

        let toast = this.toastCtrl.create({
          message:'Bienvenido',
          duration:3000,
          position:'bottom'
        });
        toast.present();
        // this.navCtrl.setRoot(HomePage);
      }
      else{
        // this.navCtrl.setRoot(HomePage);
      }
      // this.model.newUser.id = response.user.uid.toString();
      // this.model.newUser.email = response.user.email.toString();
      // this.model.newUser.name  = response.user.displayName.toString();
      // this.model.newUser.photo = response.user.photoURL.toString();
      // this.model.newUser.lastName = " ";
      // this.model.newUser.nick = " ";
      // this.model.newUser.password = " ";
      // this.model.newUser.status = Status.Online;
      // Global.userAuth =  this.model.newUser;
      // this.userService.createUser( this.model.newUser);
      // this.navCtrl.push(HomePage,{'uid':this.model.newUser.id });
      this.viewCtrl.dismiss();
      // localStorage.setItem("loginData",JSON.stringify(response));
    }).catch((error)=>{
      console.log(error);
    });
  }
  

}
