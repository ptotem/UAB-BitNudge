var StatusMessagesModel=require('../../models/StatusMessages');
var UsersModel=require('../../models/Users');
var SocialFeedModel=require('../../models/SocialFeed');
var StatusMessagesController={
  createStatusMessage:function(orgId,userId,statusData,callback){
    StatusMessagesModel.createStatusMessage(orgId,userId,statusData,function(err,obj){
      if(err) handleError(err);
      UsersModel.findOne({_id:userId},function(err,user){
        user.followers.forEach(function(follower){
          SocialFeedModel.addMessageToFeed(userId,obj._id,function(){});
        });
      });
      return callback(err,obj);
    });
  },
  getStatusMessage:function(id,params,callback){
    StatusMessagesModel.getStatusMessage(id,callback);
  },
  getStatusMessagesOfUser:function(userId,callback){
    StatusMessagesModel.getStatusMessagesOfUser(userId,callback);
  },
  updateStatusMessage:function(id,updatedData,callback){
    StatusMessagesModel.updateStatusMessage(id,updatedData,callback);
  },
  deleteStatusMessage:function(id,callback){
    StatusMessagesModel.deleteStatusMessage(id,callback);
  }
};
module.exports=StatusMessagesController;
