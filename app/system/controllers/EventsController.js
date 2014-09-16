var PointsEngine=require('./PointsEngine/RankController.js');
var RevenuesController=require('./RevenueController.js');
var EventsController={
  onRegisterTransaction:function(){
  },
  onApproveTransaction:function(){
  },
  triggerSystemActivity:function(){
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
