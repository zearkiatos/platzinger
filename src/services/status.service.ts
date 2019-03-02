
import {IStatusService} from '../interfaces/IStatusService';
import { Status } from '../models/status';
import { Injectable } from '@angular/core';
@Injectable()
export class StatusService implements IStatusService{

    
    userStatus : Status[];
    
    constructor(){

        let status1:Status = {
            name: "Active",
            color:"Green",
            id:1,
            icon:"contact"
        };

        let status2:Status = {
            name: "Away",
            color:"Orange",
            id:2,
            icon:"time"
        };

        
        let status3:Status = {
            name: "Do Not Disturb",
            color:"Red",
            id:3,
            icon:"remove-circle"
        };

        

        this.userStatus = [
            status1,
            status2,
            status3
        ]
    }

    getStatus(): Status[] {
        return this.userStatus;
    }
    
    getStatusById(id: number): Status {
        
        return this.userStatus.find(x=>x.id == id);
    }


}