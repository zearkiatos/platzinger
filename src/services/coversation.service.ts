import { ICoversationService } from "../interfaces/IConversationService";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { ConversationPage } from "../pages/conversation/conversation";
@Injectable()
export class CoversationService implements ICoversationService{
    constructor(private angularFireDatabase:AngularFireDatabase){

    }

    postConversatio(conversation: any) {
        return this.angularFireDatabase.object('coversations/'+conversation.id+'/'+conversation.timestamp)
        .set(conversation);
    }


}