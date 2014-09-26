var UsersModel=require('../models/Users');
var TeamsModel=require('../models/Teams');
var SocialFeedModel=require('../models/SocialFeed');
var NudgeMailbox=require('../models/NudgeMailbox');
var NudgeChat=require('../models/NudgeChat');
var NotificationCenterModel=require('../models/NotificationCenter');
var OrganizationalModel=require('../models/Organizations');

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
        if(!err){
            var userData={};
            userData.user=obj;
//            var Data={};
//            var personalInfo={};
//            var organizationalInfo={};
//            personalInfo.name = obj.name;
//            personalInfo.quote=obj.quote;
//            Data.personalInfo=personalInfo;
//            organizationalInfo.designation=obj.designation;
//            organizationalInfo.profileCompleteness=obj.profilecompleteness;
            TeamsModel.getTeamOfUser(req.params.userId,"","","",function(err,data)
            {
                userData.teamName=data.name;
//                Data.organizationalInfo=organizationalInfo;
//                userData.userdata=Data;
                res.header('Content-type','application/jsonp');
                res.header('Charset','utf8');
                res.send(req.query.callback + '('+ JSON.stringify(userData) + ');');

            })
//            organizationalInfo.teamName=
//            Data.organizationalInfo=organizationalInfo;
//            userData.userdata=Data;
//            res.header('Content-type','application/jsonp');
//            res.header('Charset','utf8');
//            res.send(req.query.callback + '('+ JSON.stringify(userData) + ');');
        }
        else{
            res.end('error');
        }
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
//    findTeamOfUser
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
