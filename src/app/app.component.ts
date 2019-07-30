import { AuthenticationService } from './../services/authentication.service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, App, AlertController, ModalController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ConversationPage } from '../pages/conversation/conversation';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
import { UserService } from '../services/user.service';
import { RequestService } from '../services/request.service';
import { IUser } from './interfaces/IUser';

@Component({
  templateUrl: 'app.html',
  providers:[AuthenticationService,UserService,RequestService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  user:IUser;

  constructor(public app:App, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private authService:AuthenticationService,
    private userService:UserService,private requestService:RequestService,private alertCtrl:AlertController, private modalCtrl:ModalController,private toastCtrl:ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage },
      // { title: 'Login', component: LoginPage },
      // { title: 'Conversation', component: ConversationPage },
      { title: 'Profile', component: ProfilePage }
      // { title: 'About', component: AboutPage }
    ];

    this.authService.getStatus().subscribe((session)=>{
      this.userService.getUserById(session.uid).valueChanges().subscribe((user:IUser)=>{
        this.user = user;
        this.getFriendRequest();
      },
      (error)=>{
        console.log(error);
      });
    })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    this.authService.logOut().then(()=>{
      if(!sessionStorage)
      this.app.getRootNav().setRoot(LoginPage);
    }).catch((error)=>{
      console.log(error);
    });
  }

  getFriendRequest(){
    this.requestService.getRequestForEmail(this.user.email).valueChanges().subscribe((requests:any)=>{
      console.log(requests);
    },
    (error)=>{
      console.log(error);
    });
  }
}
