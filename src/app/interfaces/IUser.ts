import { Status } from "../../enum/status";

export interface IUser {
    name:string,
    nick:string;
    photo:any;
    lastName:string;
    age?:number;
    email:string;
    friend?:boolean;
    id:any;
    status:Status;
    active?:boolean;
    password?:string
}
