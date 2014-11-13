var tempModel=require('../models/Users');
var UserChallengesModel=tempModel.Goals;
var UsersModel=tempModel.Users;
var ChallengesModel=require('../models/Challenges');
var ChallengesCollection=require('../models/Challenges/ChallengesCollection.js');
var TransactionCollection=require('../models/TransactionMaster/TransactionMasterCollection.js');
var GoalMasterModel=require('../models/GoalMaster');
var async = require("async");
var mongoose=require('mongoose');
var ChallengesController={
  canUserAcceptChallenge:function(user,challengeObj){
    if(challengeObj.scope=="organization"&&challengeObj.entity.toString()==user.orgId.toString())
      return true;
    else if(challengeObj.scope=="team"){
      user.teams.forEach(function(teamId){
        if(teamId.toString()==challengeObj.entity.toString())
          return true;
      });
    }
    else if(challengeObj.scope=="player"&&challengeObj.entity.toString()==user._id.toString())
      return true;
    return false;
  },
  assignChallengeToUser:function(req,res){
    //if the criteria is Action, then it must be stored in the goal so that user can reuse it later.
    ChallengesModel.getChallengeOfOrganization(req.params.orgId,req.body.challenge,"","","",function(err,challengeObj1){
      var challengeObj=challengeObj1.toObject();
      if(err) return res.send(err);
      if(!challengeObj) return res.send("failed");
      if(!ChallengesController.canUserAcceptChallenge)
        return res.send("this user cannot accept this challenge");
      challengeObj.goalType="challenge";
      delete challengeObj.scope;
      delete challengeObj.entity;
      if(challengeObj.criteria=="Subgoal"){
        async.each(challengeObj.subgoals,function(subgoalObj,callback){
          GoalMasterModel.getGoalMaster(subgoalObj.subgoal,"","","",function(err,subgoalObj){
            subgoalObj.allowedTransactions=subgoalObj.allowedTransactions;
            callback();
          });
        },
        function(err){
          if(err) res.send(err);
          else
            UserChallengesModel.assignChallengeToUser(req.params.userId,challengeObj,function(err,obj){
              if(err)res.send(err);
              else res.send("success");
            });
        });
      }
      else{
        UserChallengesModel.assignChallengeToUser(req.params.userId,challengeObj,function(err,obj){
          if(err)res.send(err);
          else res.send("success");
        });
      }
    });
  },
  createChallenge:function(req,res){
    ChallengesModel.createChallengeOfOrganization(req.params.orgId,req.body,function(err,obj){
      if(err)
        res.send(err);
      else res.send("success");
    });
  },
  approveChallenge:function(req,res){
    ChallengesModel.approveChallenge(req.params.orgId,req.params.challengeId,null,function(err,obj){
      if(err) res.send(err);
      else res.send("success");
    });
  },
  getChallengeBoardOfUser:function(req,res){
    var currDate=new Date();
    var dateQuery={$gte:currDate};
    UsersModel.getUser(req.params.userId,"","","",function(err,user){
      if(err||!user) callback(err,user);
      else{
        var entitiesQuery=user.teams.slice();
        entitiesQuery.push(user.orgId);
        entitiesQuery.push(user._id);
        ChallengesCollection.aggregate({$match:{orgId:mongoose.Types.ObjectId(req.params.orgId)}},{$unwind:"$challenges"},{$match:{"challenges.endDate":dateQuery,"challenges.entity":{$in:entitiesQuery}}},{$group:{_id:"$_id",challenges:{$push:"$challenges"}}},function(err,result){
          if(err) res.send(err);
          else 
            if(result[0]&&result[0].challenges)
              res.send(result[0].challenges);
            else res.send(result);
        });
      }
    });
  },
  getChallenge:function(req,res){
    ChallengesModel.getChallenge(req.params.id,function(err,obj){
      res.send(obj);
    });
  },
  getChallengesOfOrganization:function(req,res){
    ChallengesModel.getChallengesOfOrganization(req.params.orgId,"","","",function(err,obj){
      res.send(obj);
    });
  },
  // getChallengesOfUser:function(req,res){
  //   UsersModel.getChallenges(userId,function(err,goals){
  //     res.send(goals);
  //   });
  // },
  getLiveUserChallenges:function(req,res){
    UserChallengesModel.getLiveChallengesOfUser(req.params.userId,new Date(),function(err,objs){
      if(objs[0]&&objs[0].challenges)
        res.send(objs[0].challenges);
      else res.send(objs);
      // TransactionMasterCollection.populate(objs,{path:"goals.transactions.transactionMaster",model:'TransactionMasters',select:'name'},function(err1,objs1){
      //   if(err) res.send(err);
      //   res.send(objs1[0]);
      // });
    });
  },
  // getCreatedChallengesOfUser:function(req,res){
  //   ChallengesModel.getChallengeOfUser(req.params.userId,"","","",function(err,goal){
  //     if(err)
  //       res.send(err);
  //     else res.send(goal);
  //   });
  // },
};
module.exports=ChallengesController;
