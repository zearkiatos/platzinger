import { AngularFireAuth } from 'angularfire2/auth';
import { IUserService } from './../interfaces/IUserService';
import { IUser } from '../app/interfaces/IUser';
import { Injectable } from '@angular/core';
import { Status } from '../enum/status';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService implements IUserService{
  
    items$: AngularFirestoreCollection<any>;
    items: Observable<any[]>;
    private angularFirestore:AngularFirestore;

    constructor(private angularFireDabase: AngularFireDatabase){
    }

    getUsers(){
      return this.angularFireDabase.list('/users');
    }

    getUserById(id:number){
      return this.angularFireDabase.object('/users/'+id);
    }

    createUser(user){
      return this.angularFireDabase.object('/users/'+user.id);
    }

    editUser(user){
      return this.angularFireDabase.object('/users/'+user.id).set(user);
    }


}