var UsersModel=require('../models/Users');
var TeamsModel=require('../models/Teams');
var SocialFeedModel=require('../models/SocialFeed');
var NudgeMailbox=require('../models/NudgeMailbox');
var NudgeChat=require('../models/NudgeChat');
var NotificationCenterModel=require('../models/NotificationCenter');

var UsersController={
  createUser:function(req,res){
    UsersModel.createUser(req.params.orgId,req.body,function(err,user){
      SocialFeedModel.createSocialFeed(req.params.orgId,user._id,{},function(){});
      NudgeMailbox.createNudgeMailbox(req.params.orgId,user._id,{},function(){});
      NudgeChat.createNudgeChat(req.params.orgId,user._id,{},function(){});
      NotificationCenterModel.createNotificationCenter(req.params.orgId,user._id,{},function(){});
      res.send(user);
    });
  },
  updateUser:function(req,res){
    UsersModel.updateUser(req.params.userId,req.body,function(err,obj){
      if(err) res.send("fail");
      else
        res.send("success");
    });
  },
  getUser:function(req,res){
    UsersModel.getUser(req.params.userId,"","","",function(err,obj){
      res.send(obj);
    });
  },
  getUsersOfOrganization:function(req,res){
    UsersModel.getUsersOfOrganization(req.params.orgId,"","","",function(err,goals){
      res.send(goals);
    });
  },
  // assignUserToUser:function(req,res){
  //   UsersModel.giveUserToUser(userId,medalId,function(err,obj){
  //     res.send("success");
  //   });
  // },
  deleteUser:function(req,res){
    UsersModel.deleteUser(req.params.userId,function(err,obj){
      SocialFeedModel.deleteSocialFeed(req.params.userId);
      NudgeMailbox.deleteNudgeMailbox(req.params.userId);
      NudgeChat.deleteNudgeChat(req.params.userId);
      NotificationCenterModel.deleteNotificationCenter(req.params.userId);
      if(err){
        res.send("fail");
        return handleError(err);
      }
      else{
        res.send("success");
      }
    });
  },
  addUserToTeam:function(req,res){
    TeamsModel.addMembersToTeam(req.params.teamId,req.body.userId,function(err,obj){
      if(err){
        res.send("fail");
        return handleError(err);
      }
      else{
        res.send("success");
      }
    });
  }
};
module.exports=UsersController;
