import { IConversationService } from "../interfaces/IConversationService";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { ConversationPage } from "../pages/conversation/conversation";
@Injectable()
export class ConversationService implements IConversationService{
    constructor(private angularFireDatabase:AngularFireDatabase){

    }

    postConversation(conversation: any) {
        return this.angularFireDatabase.object('coversations/'+conversation.id+'/'+conversation.timestamp)
        .set(conversation);
    }


}