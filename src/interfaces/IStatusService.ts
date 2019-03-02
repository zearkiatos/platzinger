import { Status } from "../models/status";

export interface IStatusService{
    userStatus:Status[];
    getStatus():Status[];
    getStatusById(id:number):Status;
}