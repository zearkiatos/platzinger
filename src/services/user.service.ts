import { IUserService } from './../interfaces/IUserService';
import { IUser } from '../app/interfaces/IUser';
import { Injectable } from '@angular/core';
import { Status } from '../enum/status';

@Injectable()
export class UserService implements IUserService{
    friends: IUser[];
    
    constructor(){
        let myUser:IUser={
            name:"Pedro",
            nick:"Pedro",
            email: "caprilespe@outlook.com",
            friend: true,
            uid: 1,
            status:Status.Online
          };
      
          let Usuario1:IUser={
            name:"Pedro",
            nick:"Pedro",
            email: "caprilespe@outlook.com",
            friend: false,
            uid: 1,
            status:Status.Offline
          };
      
          let Usuario2:IUser={
            name:"José",
            nick:"José",
            email: "jose@outlook.com",
            friend: true,
            uid: 2,
            status:Status.Busy
          };
      
          let Usuario3:IUser={
            name:"Luis",
            nick:"Luis",
            email: "luis@outlook.com",
            friend: false,
            uid: 3,
            status:Status.AppearOffline
          };
      
          let Usuario4:IUser={
            name:"Maria",
            nick:"Maria",
            email: "maria@outlook.com",
            friend: true,
            uid: 4,
            status:Status.Away
          };
      
          let Usuario5:IUser={
            name:"Karla",
            nick:"Karla",
            email: "karla@outlook.com",
            friend: false,
            uid: 5,
            status: Status.Online
          };
      
          console.log(myUser);
      
          let users: IUser[] = [
            myUser
          ];
          this.friends = [
            Usuario1,Usuario2,Usuario3,Usuario4,Usuario5
          ];
    }

    getFriends(): IUser[] {
        return this.friends;
    }

    getFriendById(id:number):IUser{
        return this.friends.find(item=>item.uid==id);
    }

}