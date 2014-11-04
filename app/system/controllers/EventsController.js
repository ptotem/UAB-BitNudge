var tempModel=require('../models/Users');
var PointsEngine=require('./PointsEngine/RankController.js');
var UserGoalsModel=tempModel.Goals;
var TransactionMasterModel=require('../models/TransactionMaster');
var GoalMasterModel=require('../models/GoalMaster');
var LevelsModel=require('../models/Levels');
var UserModel=tempModel.Users;
var UserPointsModel=require('../models/UserPeriodPoints');
var EventsController={
  onRegisterTransaction:function(){
  },
  onApproveTransaction:function(){
  },
  triggerSystemActivity:function(userId,systemActivityId,callback){
    TransactionMasterModel.getTransactionMaster(systemActivityId,"","","",function(err,obj){
      eval("var pointsFn=("+obj.pointsFn+");");
      var pointsEarned=pointsFn();
      EventsController.triggerUserPointsAddition(userId,pointsEarned,"systemActivity",obj._id,callback);
    });
  },
  processTransactionForUser:function(userId,transactionData,callback){
    UserGoalsModel.getLiveGoalsOfUserWithQuery(userId,{'goals.tags':transactionData.tags},new Date(),function(err,goals){
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
                  // EventsController.checkGoalStatus(userId,goalObj);
                }
              }
              else if(transactionMasterObj.type=="binary"){
                transactionObj.currentValue=transactionData.target;
                if(transactionObj.target==transactionObj.currentValue){
                  transactionObj.done=true;
                  // EventsController.calculateGoalPercentage(goalObj);
                  // check if goal is over. if over, set it as over.
                  // EventsController.checkGoalStatus(userId,goalObj);
                }
              }
              else if(transactionMasterObj.type=="additive"){
                transactionObj.currentValue+=transactionData.target;
                if(transactionObj.target<=transactionObj.currentValue){
                  transactionObj.done=true;
                  // EventsController.calculateGoalPercentage(goalObj);
                  // check if goal is over. if over, set it as over.
                  // EventsController.checkGoalStatus(userId,goalObj);
                }
              }
              //this usually means it is a type of sales/client activity. Does not have a target, but may have quantity.
              else{
                if(transactionData.target)
                  transactionObj.currentValue++;
                if(transactionObj.currentValue>=transactionData.target)
                  transactionObj.done=true;
                // EventsController.checkGoalStatus(userId,goalObj);
              }
              //for recalculating percentage of goals done.
              // UserGoalsModel.updateGoalOfUser(userId,goalObj._id,goalObj,callback);
            });
          }
        });
        // EventsController.calculateGoalPercentage(goalObj);
        // check if goal is over. if over, set it as over.
        EventsController.checkGoalStatus(userId,goalObj);
        //for recalculating percentage of goals done.
        //EventsController.calculateGoalPercentage();
        UserGoalsModel.updateGoalOfUser(userId,goalObj._id,goalObj,callback);
      });
    });
  },
  onGoalFinished:function(userId,goalObj,callback){
    var pointsEarned=goalObj.points;
    EventsController.triggerUserPointsAddition(userId,goalObj.points,'goals',goalObj._id,function(){});
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
      console.log(userId+" completed the goal "+goalObj._id);
      EventsController.onGoalFinished(userId,goalObj,function(){});
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
  tagsMatch:function(transactionData,goalObj){
    if (!array)
      return false;
    if (transactionData.tags.length != goalObj.tags.length)
      return false;
    for (var i = 0, l=this.length; i < l; i++) {
      if (this[i] instanceof Array && array[i] instanceof Array) {
        if (!this[i].equals(array[i])){
          return false;       
        }           
        else if (this[i] != array[i]) { 
          return false;   
        }           
      }       
    }
    return true;
  },
  triggerUserPointsAddition:function(userId,pointsEarned,pointsType,pointsFrom,date,callback){
    UserModel.addPointsObject(userId,{pointsEarned:pointsEarned,type:pointsType,from:pointsFrom},callback);
    UserPointsModel.addPointsEverywhere(userId,new Date(),pointsEarned,function(){});
    UserModel.getUser(userId,"teams orgId totalPoints","","",function(err,user){
      user.teams.forEach(function(teamId){
        TeamPeriodPointsModel.addPointsEverywhere(teamId,new Date(),pointsEarned,function(){});
      });
      EventsController.triggerLevelCalculation(user.orgId,userId,user.totalPoints,function(){});
    });
  },
  // triggerRankCalculation:function(orgId){
  //   PointsEngine.calculateRank(orgId);
  // },
  triggerLevelCalculation:function(orgId,userId,totalPoints,callback){
    LevelsModel.getLevelOfOrganization(orgId,"","","",function(err,obj){
      eval("var levelFn=("+obj.calculationFn+");");
      var levelNo=levelFn(points);
      UserModel.setLevelOfUser(userId,level,callback);
    });
    // PointsEngine.calculateLevel(orgId);
  },
  triggerRevenueCalculation:function(orgId){
    RevenuesController.calculateRevenues(orgId);
  }
};
module.exports=EventsController;
