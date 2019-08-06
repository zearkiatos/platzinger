import { IRequestService } from "../interfaces/IRequestService";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { ConversationPage } from "../pages/conversation/conversation";
import { AngularFireStorage } from "angularfire2/storage";
@Injectable()
export class RequestService implements IRequestService{
    constructor(private angularFireDatabase:AngularFireDatabase, private angularFireStorage:AngularFireStorage){

    }

    createRequest(request: any) {
        const cleanEmail = request.receiver_email.replace('.',',');
        return this.angularFireDatabase.object('requests/'+cleanEmail+'/'+request.sender.id)
            .set(request);
    }

    setRequestStatus(request: any, status: any) {
        const cleanEmail = request.receiver_email.replace('.',',');

        return this.angularFireDatabase.object('requests/'+cleanEmail+'/'+request.sender.id+'/status').set(status);
    }

    getRequestForEmail(email: any) {
        const cleanEmail = email.replace('.',',');

        return this.angularFireDatabase.list('requests/'+cleanEmail);
    }


}