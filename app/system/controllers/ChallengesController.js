var UserChallengesModel=require('../models/Users').Goals;
var ChallengesModel=require('../models/Challenges');
var TransactionCollection=require('../models/TransactionMaster/TransactionMasterCollection.js');
var GoalMasterModel=require('../models/GoalMaster');
var ChallengesController={
  assignChallengeToUser:function(req,res){
    //if the criteria is Action, then it must be stored in the goal so that user can reuse it later.
    req.body.type="challenge";
    if(req.body.criteria=="Subgoal"){
      async.each(req.body.subgoals,function(subgoalObj,callback){
        GoalMasterModel.getGoalMaster(subgoalObj.subgoal,"","","",function(err,subgoalObj){
          subgoalObj.allowedTransactions=subgoalObj.allowedTransactions;
          callback();
        });
      },
      function(err){
        if(err) res.send(err);
        else
          UserChallengesModel.createChallenge(req.params.userId,req.body,function(err,obj){
            if(err)res.send(err);
            else res.send("success");
          });
      });
    }
    else{
      UserChallengesModel.createChallenge(req.params.userId,req.body,function(err,obj){
        if(err)res.send(err);
        else res.send("success");
      });
    }
  },
  createChallenge:function(req,res){
    ChallengesModel.createChallenge(req.params.orgId,req.body,function(err,obj){
      if(err)
        res.send(err);
      else res.send("success");
    });
  },
  getChallenge:function(req,res){
    ChallengesModel.getChallenge(req.params.id,function(err,obj){
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
      TransactionMasterCollection.populate(objs,{path:"goals.transactions.transactionMaster",model:'TransactionMasters',select:'name'},function(err1,objs1){
        if(err) res.send(err);
        res.send(objs1[0]);
      });
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
