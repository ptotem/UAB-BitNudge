var MessagesModel=require('../../models/Messages');
var SocialEngineRoutes=require('./SocialEngineRoutes');
var SocialEngine={
  initialize:function(server){
    //initializaing routes
    for(property in SocialEngineRoutes)
    {
      methods=property.split(" ");
      eval("server."+methods[0]+"('"+methods[1]+"',"+SocialEngineRoutes[property]+');');
    }
    console.log("Users initialized");
  }
  addCommentToStatus:function(orgId,statusId,messageData,callback){
    MessagesModel.createMessage(orgId,messageData,function(err,obj){
      if(err) callback(err);
      else{
        MessagesModel.addSubMessage(statusId,obj._id,callback);
      }
    });
  },
  addLikeToStatus:function(statusId,userId,callback){
    MessagesModel.addLike(statusId,userId,callback);
  },
  addUserStatus:function(orgId,userId,statusData,callback){
    MessagesModel.createMessageOfUser(orgId,userId,statusData,callback);
  },
  getAllStatusesOfUser:function(userId,callback){
    MessagesModel.getMessagesOfUser(userId,callback);
  }
};
module.exports=SocialEngine;
