import { Component, Output } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation';
import { LoginPage } from '../login/login';
import { IUser } from '../../app/interfaces/IUser';
import { UserService } from '../../services/user.service';
import { Status } from '../../enum/status';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Global } from '../../commons/global';
import { StatusRequestEnum } from '../../utils/statusRequestEnum';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[UserService, RequestService]
})
export class HomePage {

  @Output() friends:any=[];
  public model:any = {
    user:{}
  }
  status:Status;
  @Output() query:string;
  constructor(public navCtrl: NavController, private userService:UserService, public navParams:NavParams, private alertCtrl: AlertController, private requestService:RequestService, private toastCtrl:ToastController) {
    this.userService.getUserById(this.navParams.data['uid']).valueChanges().subscribe((user)=>{
      this.model.user = user;
      Global.userAuth = user;
    },(error)=>{
      console.log(error);
    });
    const users = this.userService.getUsers();
    users.valueChanges().subscribe((users)=>{
      console.log(users);
      this.friends = users;
    })
  }

  goToConversation(user:any){
    this.navCtrl.push(ConversationPage,{"user":user});
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  sendRequest(){
    const prompt = this.alertCtrl.create({
      title:'Agregar Amigo',
      message:'Ingresar email del amigo para agregar.',
      inputs:[
        {
          name:'email',
          placeholder:'Email'
        }
      ],
      buttons:[
        {
          text:'Cancelar',
          handler:data=>{
            console.log(data);
          }
        },
        {
          text:'Enviar',
          handler:data=>{
            const request = {
              timestamp: Date.now(),
              receiver_email:data.email,
              sender:this.model.user,
              status:StatusRequestEnum.Pending
            };
            this.requestService.createRequest(request).then((data)=>{
              let toast = this.toastCtrl.create({
                message:'Solicitud Enviada',
                duration:3000,
                position:'bottom'
              });
              toast.present();
            }).catch((error)=>{
              console.log(error);
            });
          }

        }
      ]
    });

    prompt.present();
  }
}
