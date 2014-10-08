var UsersModel=require('../models/Users').Users;
var TeamsModel=require('../models/Teams');
var SocialFeedModel=require('../models/SocialFeed');
var NudgeMailbox=require('../models/NudgeMailbox');
var NudgeChat=require('../models/NudgeChat');
var NotificationCenterModel=require('../models/NotificationCenter');
var OrganizationalModel=require('../models/Organizations');

var UsersController={
  createUser:function(req,res){
    UsersModel.createUser(req.params.orgId,req.body,function(err,user){
      EventsModel.createEvents(req.params.orgId,user._id,function(){});
      // SocialFeedModel.createSocialFeed(req.params.orgId,user._id,{},function(){});
      NudgeMailbox.createNudgeMailbox(req.params.orgId,user._id,{},function(){});
      NudgeChat.createNudgeChat(req.params.orgId,user._id,{},function(){});
      NotificationCenterModel.createNotificationCenter(req.params.orgId,user._id,{},function(){});
      UserPeriodPointsModel.createUserPeriodPoints(req.params.orgId,req.params._id,{},function(){});
      res.send(user);
    });
  },
    IsAuthenticated:function(req,res) {
        UsersModel.IsAuthenticated(req.query.username,req.query.password,function(err,obj)
        {
//            console.log('hkll');
            if(err) res.send("fail");
            else
            res.send(obj);
        })


    },
    updateUser:function(req,res){
    UsersModel.updateUser(req.params.userId,req.body,function(err,obj){
      if(err) res.send("fail");
      else
        res.send("success");
    });
  },
  getUser:function(req,res){
    UsersModel.getUser(req.params.userId,"-_id name profileCompleteness","","teams",function(err,obj){
      res.send(obj);
      // if(req.user._id==req.params.userId)
      //   res.send(obj);
      // else res.send(401,{status:{http:401,message:'Not Authorized'}});
    });
  },
//  getUsersOfOrganization:function(req,res){
//    UsersModel.getUsersOfOrganization(req.params.orgId,"name ","","",function(err,goals){
//      res.send(goals);
//    });
//  },
    getUsersOfOrganization:function(req,res){
        var r=req.query.limits;
        var last=req.query.offset;
//        console.log(r);
//        StoreModel.getStoresOfOrganization(req.params.orgId,"",{ limit : req.query.limits ,skip :req.query.offset},"",function(err,obj){

                UsersModel.getUsersOfOrganization(req.params.orgId,"name",{ limit : req.query.limits ,skip :req.query.offset},{path:'users'},function(err,objs){
//            console.log(last);
            if(err){
                res.send("fail");
                return handleError(err);
            }
            res.send(objs);
        });
    },
  getTransactionHistoryOfUser:function(req,res){
    UsersModel.getTransactionHistoryOfUser(req.params.userId,function(err,objs){
      if(err) res.send(err);
      else res.send(objs);
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
