

export interface IConversationService{
    postConversation(conversation);

    getById(id:number);
    

    uploadPictureConversation(pictureName: any, image: any);
  
    getDownloadURLConversation(pictureName: any);
}