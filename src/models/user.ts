import { Status } from '../enum/status';
import { IUser } from "../app/interfaces/IUser";


export class User implements IUser {

    password?: string;
    active?: boolean;
    photo: any;
    lastName: string;
    id: any;
    name: string;    
    nick: string;
    age?: number;
    email: string;
    friends?:any[];
    friend?: boolean;
    status: Status;


}