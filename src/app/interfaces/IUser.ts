import { Status } from "../../enum/status";

export interface IUser {
    name:string,
    nick:string;
    photo:string;
    lastName:string;
    age?:number;
    email:string;
    friend?:boolean;
    friends?:any[];
    id:any;
    status:Status;
    active?:boolean;
    password?:string
}
