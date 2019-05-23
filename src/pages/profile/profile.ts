import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Button } from 'ionic-angular';
import { IUser } from '../../app/interfaces/IUser';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers:[AuthenticationService, UserService]
})
export class ProfilePage {
  public user:User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthenticationService, private userService: UserService, private alertCtrl:AlertController) {
    this.authService.getStatus().subscribe((data)=>{
      this.userService.getUserById(data.uid).valueChanges().subscribe((user:any)=>{
        this.user = user;
        console.log(this.user);
      }, 
      (error)=>{
        console.log(error);
      });
    },
    (error)=>{
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  saveData(){

    this.userService.editUser(this.user).then((data)=>{
      let alert = this.alertCtrl.create({
        title:"Mensaje",
        message:"Datos Actualizados con éxito.",
        buttons:["Aceptar"]  
      });
      alert.present();
    }).catch((error)=>{
      let alertError = this.alertCtrl.create({
        title:"Mensaje",
        message:"Ocurrio un error al editar los datos. Error: "+error,
        buttons:["Aceptar"]  
      });
      alertError.present();
      console.log(error);
    });
  }

}
