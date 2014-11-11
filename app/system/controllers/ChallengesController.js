var UserChallengesModel=require('../models/Users').Goals;
var ChallengesModel=require('../models/Challenges');
var TransactionCollection=require('../models/TransactionMaster/TransactionMasterCollection.js');
var GoalMasterModel=require('../models/GoalMaster');
var ChallengesController={
  assignChallengeToUser:function(req,res){
    //if the criteria is Action, then it must be stored in the goal so that user can reuse it later.
    ChallengesModel.getChallenge(req.body.challenge,"","","",function(err,challengeObj){
      if(err) res.send(err);
      if(!challengeObj) res.send("failed");
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
        UserChallengesModel.assignChallengeToUser(req.params.userId,req.body,function(err,obj){
          if(err)res.send(err);
          else res.send("success");
        });
      }
    });
  },
  createChallenge:function(req,res){
    ChallengesModel.createChallenge(req.params.orgId,req.body,function(err,obj){
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
      res.send(objs[0]);
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
