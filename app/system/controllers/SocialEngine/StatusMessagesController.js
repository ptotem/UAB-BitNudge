var StatusMessagesModel=require('../../models/StatusMessages');
var UsersModel=require('../../models/Users');
var SocialFeedModel=require('../../models/SocialFeed');
var NotificationCenterModel=require('../../models/NotificationCenter');
var StatusMessagesController={
  createStatusMessage:function(req,res){
    StatusMessagesModel.createStatusMessage(req.params.orgId,req.params.userId,req.query,function(err,obj){
      if(err){ 
        res.send("error"+JSON.stringify(err));
        return handleError(err);
      }
      SocialFeedModel.addMessageToFeed(userId,obj._id,function(){});
      UsersModel.findOne({_id:userId},function(err,user){
        user.followers.forEach(function(follower){
          // TODO:- Change to notification. Send the message to the org's social feed though.
          NotificationCenterModel.addNotification(obj._id,function(){});
        });
      });
      return res.send("success");
    });
  },
  getStatusMessage:function(req,res){
    StatusMessagesModel.getStatusMessage(req.params.statusId,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  getStatusMessagesOfUser:function(req,res){
    StatusMessagesModel.getStatusMessagesOfUser(req.params.userId,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  updateStatusMessage:function(req,res){
    StatusMessagesModel.updateStatusMessage(req.params.statusId,req.query,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  deleteStatusMessage:function(req,res){
    StatusMessagesModel.deleteStatusMessage(req.params.statusId,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  }
};
module.exports=StatusMessagesController;
