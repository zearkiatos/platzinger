import { IAuthenticationService } from './../interfaces/IAuthenticationService';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth'

@Injectable()
export class AuthenticationService implements IAuthenticationService{
    constructor(private angularFireAuth:AngularFireAuth){

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
    
}