import { AngularFireAuth } from 'angularfire2/auth';
import { IUserService } from './../interfaces/IUserService';
import { IUser } from '../app/interfaces/IUser';
import { Injectable } from '@angular/core';
import { Status } from '../enum/status';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class UserService implements IUserService{
  
    items$: AngularFirestoreCollection<any>;
    items: Observable<any[]>;
    private angularFirestore:AngularFirestore;

    constructor(private angularFireDabase: AngularFireDatabase, private angularFireStorage:AngularFireStorage){
    }

    getUsers(){
      return this.angularFireDabase.list('/users');
    }

    getUserById(id:string){
      return this.angularFireDabase.object('/users/'+id);
    }

    createUser(user:User){
      return this.angularFireDabase.object('/users/'+user.id).set(user);
    }

    editUser(user:User){
      return this.angularFireDabase.object('/users/'+user.id).set(user);
    }

    uploadPicture(pictureName: any, image: any) {
      return this.angularFireStorage.ref('pictures/'+pictureName).putString(image,'data_url');
    }

    getDownloadURL(pictureName: any) {
      return this.angularFireStorage.ref('pictures/'+pictureName).getDownloadURL();
    }

    addFriend(uid: any, friendId: any) {
      this.angularFireDabase.object('users/'+uid+'friends/'+friendId).set(friendId);
      this.angularFireDabase.object('users/'+friendId+'friends/'+uid).set(uid);
    }

}