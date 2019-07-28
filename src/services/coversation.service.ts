import { IConversationService } from "../interfaces/IConversationService";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { ConversationPage } from "../pages/conversation/conversation";
import { AngularFireStorage } from "angularfire2/storage";
@Injectable()
export class ConversationService implements IConversationService{
    constructor(private angularFireDatabase:AngularFireDatabase, private angularFireStorage:AngularFireStorage){

    }

    postConversation(conversation: any) {
        return this.angularFireDatabase.object('conversations/'+conversation.uid+'/'+conversation.timestamp)
        .set(conversation);
    }

    getById(id: number) {
        return this.angularFireDatabase.list('conversations/'+id);
    }

    uploadPictureConversation(pictureName: any, image: any) {
        return this.angularFireStorage.ref('pictures/'+pictureName).putString(image,'data_url');
      }
  
      getDownloadURLConversation(pictureName: any) {
        return this.angularFireStorage.ref('pictures/'+pictureName).getDownloadURL();
      }




}