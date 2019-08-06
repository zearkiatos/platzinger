import { AngularFireDatabase } from '@angular/fire/database';
import { IAuthenticationService } from './../interfaces/IAuthenticationService';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth'
import * as firebase from "firebase/app"

@Injectable()
export class AuthenticationService implements IAuthenticationService{
    constructor(private angularFireAuth:AngularFireAuth, private angularFireDataBase:AngularFireDatabase){

    }

    loginWithEmail(email:string, password:string){
        return this.angularFireAuth.auth.signInWithEmailAndPassword(email,password);
    }

    registerWithEmail(email:string, password:string){
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password);
    }

    getStatus(){
        return this.angularFireAuth.authState;
    }

    logOut(){
        return this.angularFireAuth.auth.signOut();
    }

    loginWithFacebook(){
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.angularFireAuth.auth.signInWithPopup(provider);
    }
    
}