var PointsEngine=require('./PointsEngine');
var RevenuesController=require('./RevenuesController.js');
var EventsController={
  onRegisterTransaction:function(){
  },
  onApproveTransaction:function(){
  },
  triggerSystemActivity:function(){
  },
  triggerRankCalculation:function(orgId){
    PointsEngine.RankController.calculateRank(orgId);
  },
  triggerLevelCalculation:function(orgId){
    PointsEngine.LevelController.calculateLevel(orgId);
  },
  triggerRevenueCalculation:function(orgId){
    RevenuesController.calculateRevenues(orgId);
  }
};
module.exports=EventsController;
