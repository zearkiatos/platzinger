import { HomePage } from './../home/home';
import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, Output } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { Global } from '../../commons/global';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[AuthenticationService]
})
export class LoginPage {

  @Output() public model:any ={
    user:{
      email:"",
      password:""
    }
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private authenticationService:AuthenticationService) {
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

}
