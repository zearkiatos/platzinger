import { IUser } from "../app/interfaces/IUser";

export interface IUserService{


    getUsers();
  
    getUserById(id:string);
  
    createUser(user);
  
    editUser(user);
}