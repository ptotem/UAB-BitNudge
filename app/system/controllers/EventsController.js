var PointsEngine=require('./PointsEngine/RankController.js');
var UserGoalsModel=require('../models/UserGoals/UserGoals.js');
var TransactionMasterModel=require('../models/TransactionMaster');
var GoalMasterModel=require('../models/GoalMaster');
var UserModel=require('../models/Users');
var EventsController={
  onRegisterTransaction:function(){
  },
  onApproveTransaction:function(){
  },
  triggerSystemActivity:function(){
  },
  processTransactionForUser:function(userId,transactionData,callback){
    UserGoalsModel.getLiveGoalsOfUser(userId,new Date(),function(err,goals){
      var allGoals=goals[0].goals;
      allGoals.forEach(function(goalObj){
        goalObj.transactions.forEach(function(transactionObj){
          if(transactionObj.transactionMaster.toString()==transactionData.transactionMaster.toString()){
            TransactionMasterModel.getTransactionMaster(transactionObj.transactionMaster,"","","",function(err,transactionMasterObj){
              if(!transactionObj.currentValue)
                transactionObj.currentValue=0;
              if(transactionMasterObj.type=="state"){
                transactionObj.currentValue=transactionData.target;
                if(transactionObj.target==transactionObj.currentValue){
                  transactionObj.done=true;
                  // EventsController.calculateGoalPercentage(goalObj);
                  EventsController.checkGoalStatus(userId,goalObj);
                }
              }
              else if(transactionMasterObj.type=="binary"){
                transactionObj.currentValue=transactionData.target;
                if(transactionObj.target==transactionObj.currentValue){
                  transactionObj.done=true;
                  // EventsController.calculateGoalPercentage(goalObj);
                  // check if goal is over. if over, set it as over.
                  EventsController.checkGoalStatus(userId,goalObj);
                }
              }
              else if(transactionMasterObj.type=="additive"){
                transactionObj.currentValue+=transactionData.target;
                if(transactionObj.target<=transactionObj.currentValue){
                  transactionObj.done=true;
                  // EventsController.calculateGoalPercentage(goalObj);
                  // check if goal is over. if over, set it as over.
                  EventsController.checkGoalStatus(userId,goalObj);
                }
              }
              //for recalculating percentage of goals done.
              UserGoalsModel.updateGoalOfUser(userId,goalObj._id,goalObj,callback);
            });
          }
        });
      });
    });
  },
  checkGoalStatus:function(userId,goalObj){
    if(goalObj.completed)
      return;
    var completed=true;
    goalObj.transactions.forEach(function(transactionObj){
      if(!transactionObj.done)
        completed=false;
    });
    if(completed){
      goalObj.completed=true;
      console.log("completed");
      UserModel.incrementUserCashAndPointsBy(userId,goalObj.points,function(err,obj){
        if(err) console.log(err);
      });
    }
  },
  calculateGoalPercentage:function(goalObj){
    if(!goalObj.transactionsDone)
      goalObj.transactionsDone=0;
    goalObj.transactionsDone++;
    GoalMasterModel.getGoalMaster(goalObj.goalMaster,"","","",function(err,goalMasterObj){
      goalObj.percentage=goalObj.transactionsDone/goalMasterObj.noOfTransactions*100;
    });
  },
  triggerRankCalculation:function(orgId){
    PointsEngine.calculateRank(orgId);
  },
  triggerLevelCalculation:function(orgId){
    // PointsEngine.calculateLevel(orgId);
  },
  triggerRevenueCalculation:function(orgId){
    RevenuesController.calculateRevenues(orgId);
  }
};
module.exports=EventsController;
