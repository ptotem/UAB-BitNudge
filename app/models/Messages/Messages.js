var MessagesCollection=require('./MessagesCollection.js');
var Messages={
  initialize:function(server){
    console.log("messages initialized");
  },
  createMessage:function(organizationId,name){
    var l=new MessagesCollection({organizationId:organizationId,name:name});
    l.save();
    return true;
  },
  getMessage:function(id,callback){
    MessagesCollection.findOne({_id:id},callback);
  },
  getMessagesOfOrganization:function(orgId,callback){
    MessagesCollection.find({organizationId:orgId},callback);
  },
  addSubMessage:function(id,messageId,callback){
    MessagesCollection.update({_id:id},{$push:{messages:messageId}},callback);
  },
  addLike:function(id,userId,callback){
    MessagesCollection.update({_id:id},{$push:{likes:userId}},callback);
  },
  getMessageSchema:function(){
    return MessagesCollection.Schema;
  },
  deleteMessage:function(id,callback){
    MessagesCollection.remove({_id:id},callback);
  },
  updateMessage:function(id,fieldName,value,callback){
    var temp={};
    temp[fieldName]=value;
    MessagesCollection.update({_id:id},{$set:temp},callback);
  }
};
module.exports=Messages;
