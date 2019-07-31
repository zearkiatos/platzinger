import { IUser } from "../app/interfaces/IUser";

export interface IUserService{


    getUsers();
  
    getUserById(id:string);
  
    createUser(user);
  
    editUser(user);

    uploadPicture(pictureName, image);

    getDownloadURL(pictureName);

    addFriend(uid,friendId);
}