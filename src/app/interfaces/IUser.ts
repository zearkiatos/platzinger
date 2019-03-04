import { Status } from "../../enum/status";

export interface IUser {
    name:string,
    nick:string;
    subnick?:string;
    age?:number;
    email:string;
    friend:boolean;
    uid:any;
    status:Status;
}