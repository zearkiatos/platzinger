import { IUser } from "../app/interfaces/IUser";

export interface IUserService{


    getUsers();
  
    getUserById(id:number);
  
    createUser(user);
  
    editUser(user);
}