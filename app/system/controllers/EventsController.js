var tempModel=require('../models/Users');
// var PointsEngine=require('./PointsEngine/RankController.js');
var UserGoalsModel=tempModel.Goals;
var TransactionMasterModel=require('../models/TransactionMaster');
var GoalMasterModel=require('../models/GoalMaster');
var LevelsModel=require('../models/Levels');
var UserModel=tempModel.Users;
var UserPointsModel=require('../models/UserPeriodPoints');
var TeamPeriodPointsModel=require('../models/TeamPeriodPoints');
var RankController=require('../controllers/PointsEngine/RankController.js');
var async=require('async');
var EventsController={
  onRegisterTransaction:function(){
  },
  onApproveTransaction:function(){
  },
  triggerSystemActivity:function(orgId,userId,systemActivityId,callback){
    TransactionMasterModel.getTransactionMaster(systemActivityId,"","","",function(err,obj){
      eval("var pointsFn=("+obj.pointsFn+");");
      var pointsEarned=pointsFn();
      EventsController.triggerUserPointsAddition(orgId,userId,pointsEarned,"systemActivity",obj._id,callback);
    });
  },
  processTransactionForUser:function(userId,transactionData,callback){
    // UserGoalsModel.getLiveGoalsOfUserWithQuery(userId,{'goals.tags':transactionData.tags},new Date(),function(err,goals){
    // UserGoalsModel.getLiveGoalsOfUserWithQuery(userId,{'goals.tags':transactionData.tags},new Date(),function(err,goals){
    //   var allGoals=goals[0].goals;
    //   allGoals.forEach(function(goalObj){
    //     goalObj.transactions.forEach(function(transactionObj){
    //       if(transactionObj.transactionMaster.toString()==transactionData.transactionMaster.toString()){
    //         TransactionMasterModel.getTransactionMaster(transactionObj.transactionMaster,"","","",function(err,transactionMasterObj){
    //           if(!transactionObj.currentValue)
    //             transactionObj.currentValue=0;
    //           if(transactionMasterObj.type=="state"){
    //             transactionObj.currentValue=transactionData.target;
    //             if(transactionObj.target==transactionObj.currentValue){
    //               transactionObj.done=true;
    //               // EventsController.calculateGoalPercentage(goalObj);
    //               // EventsController.checkGoalStatus(userId,goalObj);
    //             }
    //           }
    //           else if(transactionMasterObj.type=="binary"){
    //             transactionObj.currentValue=transactionData.target;
    //             if(transactionObj.target==transactionObj.currentValue){
    //               transactionObj.done=true;
    //               // EventsController.calculateGoalPercentage(goalObj);
    //               // check if goal is over. if over, set it as over.
    //               // EventsController.checkGoalStatus(userId,goalObj);
    //             }
    //           }
    //           else if(transactionMasterObj.type=="additive"){
    //             transactionObj.currentValue+=transactionData.target;
    //             if(transactionObj.target<=transactionObj.currentValue){
    //               transactionObj.done=true;
    //               // EventsController.calculateGoalPercentage(goalObj);
    //               // check if goal is over. if over, set it as over.
    //               // EventsController.checkGoalStatus(userId,goalObj);
    //             }
    //           }
    //           //this usually means it is a type of sales/client activity. Does not have a target, but may have quantity.
    //           else{
    //             if(transactionData.target)
    //               transactionObj.currentValue++;
    //             if(transactionObj.currentValue>=transactionData.target)
    //               transactionObj.done=true;
    //             // EventsController.checkGoalStatus(userId,goalObj);
    //           }
    //           //for recalculating percentage of goals done.
    //           // UserGoalsModel.updateGoalOfUser(userId,goalObj._id,goalObj,callback);
    //         });
    //       }
    //     });
    //     // EventsController.calculateGoalPercentage(goalObj);
    //     // check if goal is over. if over, set it as over.
    //     EventsController.checkGoalStatus(userId,goalObj);
    //     //for recalculating percentage of goals done.
    //     //EventsController.calculateGoalPercentage();
    //     UserGoalsModel.updateGoalOfUser(userId,goalObj._id,goalObj,callback);
    //   });
    // });
    var asyncify=function(){
      UserGoalsModel.getLiveGoalsAndChallengesOfUserWithQuery(userId,{'goals.action.allowedTransactions':transactionData.transactionMaster},new Date(),function(err,goals){
        var allGoals=goals[0].goals;
        allGoals.forEach(function(goalObj){
          goalObj.action.allowedTransactions.forEach(function(allowedTransaction){
            if(allowedTransaction==transactionData.transactionMaster){
              TransactionMasterModel.getTransactionMaster(allowedTransaction,"","","",function(err,transMaster){
                if(!action.currentValue)
                  action.currentValue=0;
                if(transMaster.paramCategory=="additive"){
                  action.currentValue+=transactionData.keyParamValue;
                  if(action.targetValue<=action.currentValue)
                    goalObj.done=true;
                }
                else if(transMaster.paramCategory=="binary"){
                  action.currentValue=transactionData.keyParamValue;
                  if(action.targetValue<=action.currentValue)
                    goalObj.done=true;
                }
                else if(transMaster.paramCategory=="state"){
                  action.currentValue=transactionData.keyParamValue;
                  if(action.targetValue<=action.currentValue)
                    goalObj.done=true;
                }
              });
            }
          });
        });
      });
    };
    UserGoalsModel.getLiveGoalsAndChallengesOfUserWithQuery(userId,{'goals.subgoals.allowedTransactions':transactionData.transactionMaster},new Date(),function(err,goals){
      var allGoals=goals[0].goals;
      allGoals.forEach(function(goalObj){
        goalObj.subgoals.forEach(function(subgoal){
          subgoal.allowedTransactions.forEach(function(allowedTransaction){
            if(allowedTransaction==transactionData.transactionMaster){
              TransactionMasterModel.getTransactionMaster(allowedTransaction,"","","",function(err,transMaster){
                if(!subgoal.currentValue)
                  subgoal.currentValue=0;
                if(transMaster.paramCategory=="additive"){
                  subgoal.currentValue+=transactionData.keyParamValue;
                  if(subgoal.targetValue<=subgoal.currentValue)
                    subgoal.done=true;
                }
                else if(transMaster.paramCategory=="binary"){
                  subgoal.currentValue=transactionData.keyParamValue;
                  if(subgoal.targetValue<=subgoal.currentValue)
                    subgoal.done=true;
                }
                else if(transMaster.paramCategory=="state"){
                  subgoal.currentValue=transactionData.keyParamValue;
                  if(subgoal.targetValue<=subgoal.currentValue)
                    subgoal.done=true;
                }
                EventsController.checkGoalStatus(orgId,userId,goalObj);
                UserGoalsModel.updateGoalOfUser(userId,goalObj._id,goalObj,callback);
              });
            }
          });
        });
      });
      asyncify();
    });
  },
  onGoalFinished:function(orgId,userId,goalObj,callback){
    var pointsEarned=goalObj.points;
    EventsController.triggerUserPointsAddition(orgId,userId,goalObj.points,'goals',goalObj._id,function(){});
  },
  checkGoalStatus:function(orgId,userId,goalObj){
    if(goalObj.completed)
      return;
    var completed=true;
    if(goalObj.subgoals){
      goalObj.subgoals.forEach(function(subgoalObj){
        if(!subgoalObj.done)
        completed=false;
      });
    }
    if(completed){
      goalObj.completed=true;
      console.log(userId+" completed the goal "+goalObj._id);
      EventsController.onGoalFinished(orgId,userId,goalObj,function(){});
    }
  },
  // calculateGoalPercentage:function(userId,goalObj){
  //   return 
  //     goalObj.percentage=goalObj.
  //   UserGoalsModel.updateGoalOfUser(userId,)
  //   if(!goalObj.transactionsDone)
  //     goalObj.transactionsDone=0;
  //   goalObj.transactionsDone++;
  //   GoalMasterModel.getGoalMaster(goalObj.goalMaster,"","","",function(err,goalMasterObj){
  //     goalObj.percentage=goalObj.transactionsDone/goalMasterObj.noOfTransactions*100;
  //   });
  // },
  // tagsMatch:function(transactionData,goalObj){
  //   if (!array)
  //     return false;
  //   if (transactionData.tags.length != goalObj.tags.length)
  //     return false;
  //   for (var i = 0, l=this.length; i < l; i++) {
  //     if (this[i] instanceof Array && array[i] instanceof Array) {
  //       if (!this[i].equals(array[i])){
  //         return false;       
  //       }           
  //       else if (this[i] != array[i]) { 
  //         return false;   
  //       }           
  //     }       
  //   }
  //   return true;
  // },
  triggerUserPointsAddition:function(orgId,userId,pointsEarned,pointsType,pointsFrom,date,finalCallback){
    async.series([
      function(callback){
        UserModel.addPointsObject(userId,{pointsEarned:pointsEarned,source:pointsType,from:pointsFrom},callback);
      },
      function(callback){
        UserPointsModel.addPointsEverywhere(userId,date,pointsEarned,callback);
      },
      function(callback){
        UserModel.getUser(userId,"teams orgId totalPoints","","",function(err,user){
          EventsController.triggerLevelCalculation(orgId,user._id,user.totalPoints,function(err,result){
            async.each(user.teams,
              function(teamId,eachCallback){
                TeamPeriodPointsModel.addPointsEverywhere(teamId,date,pointsEarned,eachCallback);
              },
              function(err){
                callback(err);
            });
          });
        });
      },
      function(callback){
        RankController.calculateRankOfUserOfPeriod(orgId,userId,"month",date,callback);
      }
    ],
      function(err,results){
        finalCallback(err);
    });
  },
  // triggerRankCalculation:function(orgId){
  //   PointsEngine.calculateRank(orgId);
  // },
  triggerLevelCalculation:function(orgId,userId,totalPoints,callback){
    LevelsModel.getLevelOfOrganization(orgId,"","","",function(err,obj){
      eval("var levelFn=("+obj.calculationFn+");");
      var levelNo=levelFn(totalPoints);
      UserModel.setLevelOfUser(userId,levelNo,callback);
    });
  },
  triggerRevenueCalculation:function(orgId){
    RevenuesController.calculateRevenues(orgId);
  }
};
module.exports=EventsController;
