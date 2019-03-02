import { IUserService } from './../interfaces/IUserService';
import { IUser } from '../app/interfaces/IUser';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService implements IUserService{
    friends: IUser[];
    
    constructor(){
        let myUser:IUser={
            nick:"Pedro",
            email: "caprilespe@outlook.com",
            friend: true,
            uid: 1,
            statusId:1
          };
      
          let Usuario1:IUser={
            nick:"Pedro",
            email: "caprilespe@outlook.com",
            friend: false,
            uid: 1,
            statusId:2
          };
      
          let Usuario2:IUser={
            nick:"José",
            email: "jose@outlook.com",
            friend: true,
            uid: 2,
            statusId:3
          };
      
          let Usuario3:IUser={
            nick:"Luis",
            email: "luis@outlook.com",
            friend: false,
            uid: 3,
            statusId:1
          };
      
          let Usuario4:IUser={
            nick:"Maria",
            email: "maria@outlook.com",
            friend: true,
            uid: 4,
            statusId:2
          };
      
          let Usuario5:IUser={
            nick:"Karla",
            email: "karla@outlook.com",
            friend: false,
            uid: 5,
            statusId:3
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