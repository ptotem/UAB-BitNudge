var StatusMessagesModel=require('../../models/StatusMessages');
var UsersModel=require('../../models/Users');
var SocialFeedModel=require('../../models/SocialFeed');
var StatusMessagesController={
  createStatusMessage:function(req,res){
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
  getStatusMessage:function(req,res){
    StatusMessagesModel.getStatusMessage(id,callback);
  },
  getStatusMessagesOfUser:function(req,res){
    StatusMessagesModel.getStatusMessagesOfUser(userId,callback);
  },
  updateStatusMessage:function(req,res){
    StatusMessagesModel.updateStatusMessage(id,updatedData,callback);
  },
  deleteStatusMessage:function(req,res){
    StatusMessagesModel.deleteStatusMessage(id,callback);
  }
};
module.exports=StatusMessagesController;
