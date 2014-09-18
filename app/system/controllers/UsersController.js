var UsersModel=require('../models/Users');
var TeamsModel=require('../models/Teams');

var UsersController={
  createUser:function(req,res){
    UsersModel.createUser(orgId,req.query);
    SocialFeedModel.createSocialFeed(orgId,{});
    NudgeMailbox.createNudgeMailbox(orgId,{});
    NudgeChat.createNudgeChat(orgId,{});
    NotificationCenterModel.createNotificationCenter(orgId,{});
  },
  updateUser:function(req,res){
    UsersModel.updateUser(req.params.userId,req.query,function(err,obj){
      res.send(obj);
    });
  },
  getUser:function(req,res){
    UsersModel.getUser(req.params.userId,function(err,obj){
      res.send(obj);
    });
  },
  getUsersOfOrganization:function(req,res){
    UsersModel.getUsersOfOrganization(req.params.orgId,function(err,goals){
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
    TeamsModel.addMembersToTeam(req.params.teamId,req.query.userId,function(err,obj){
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
