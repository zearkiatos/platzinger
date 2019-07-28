import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { RegisterPage } from './../pages/register/register';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ConversationPage } from '../pages/conversation/conversation';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
import { ServicesUserProvider } from '../providers/services-user/services-user';
import { SearchPipe } from '../pipes/search';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Base64 } from '@ionic-native/base64';
import {AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import { HttpClientModule } from '@angular/common/http';
import {Vibration} from '@ionic-native/vibration';
export const firebaseConfig = {
  apiKey: "AIzaSyBHCs_k9r54Rxah2R6PPAs1taYLFDvzyx0",
  authDomain: "platzinger-2ba00.firebaseapp.com",
  databaseURL: "https://platzinger-2ba00.firebaseio.com",
  projectId: "platzinger-2ba00",
  storageBucket: "platzinger-2ba00.appspot.com",
  messagingSenderId: "945864865727"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ConversationPage,
    ProfilePage,
    AboutPage,
    SearchPipe,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ConversationPage,
    ProfilePage,
    AboutPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesUserProvider,
    Camera,
    Geolocation,
    Vibration
  ]
})
export class AppModule {}
