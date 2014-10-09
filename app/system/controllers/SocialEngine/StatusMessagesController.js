var StatusMessagesModel=require('../../models/StatusMessages');
var UsersModel=require('../../models/Users').Users;
var SocialFeedModel=require('../../models/SocialFeed');
var NotificationCenterModel=require('../../models/NotificationCenter');
var mongoose=require('mongoose');
var StatusMessagesController={
  createStatusMessage:function(req,res){
    StatusMessagesModel.createStatusMessage(req.params.orgId,req.params.userId,req.body,function(err,obj){
      if(err){ 
        res.send("error"+JSON.stringify(err));
        return handleError(err);
      }
      SocialFeedModel.addMessageToFeed(req.params.orgId,obj._id,function(){});
      UsersModel.getUser(req.params.userId,"","","",function(err,user){
        user.followers.forEach(function(follower){
          NotificationCenterModel.addNotification(follower,{content:user.name+" added a status.",time:new Date(),url:"org/"+req.params.orgId+"/users/"+req.params.userId+"/statuses/"+obj._id},function(){});
        });
      });
      return res.send("success");
    });
  },
  getStatusMessage:function(req,res){
    StatusMessagesModel.getStatusMessage(req.params.statusId,"","","",function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  // getStatusMessagesOfUser:function(req,res){
  //   StatusMessagesModel.getStatusMessagesOfUser(req.params.userId,"","",{path:"messages.userId",model:"users"},function(err,obj){
  //     if(err) res.send(err);
  //     else res.send(obj);
  //   });
  // },
  updateStatusMessage:function(req,res){
    StatusMessagesModel.updateStatusMessage(req.params.statusId,req.body,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  likeStatusMessage:function(req,res){
    StatusMessagesModel.likeStatusMessage(req.params.statusId,req.body.userId,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  commentOnStatusMessage:function(req,res){
    // StatusMessagesModel.createStatusMessage(req.params.orgId,req.body.userId,req.body,function(err,obj){
    StatusMessagesModel.commentOnStatusMessage(req.params.statusId,req.body,function(err,result){
      if(err) res.send(err);
      else res.send("success");
    });
    // });
  },
  // getCommentsOnStatus:function(req,res){
  // },
  deleteStatusMessage:function(req,res){
    StatusMessagesModel.deleteStatusMessage(req.params.statusId,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  }
};
module.exports=StatusMessagesController;
