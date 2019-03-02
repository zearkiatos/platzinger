import { IUser } from "../app/interfaces/IUser";

export interface IUserService{

    friends:IUser[];

    getFriends():IUser[];

    getFriendById(id:number):IUser;
}