var goalMasterModel=require('../../system/models/GoalMaster');

var goalMasterController={
  getAllGoalMasters:function(req,res){
    goalMasterModel.getAllGoalMasters("","","transactions",function(err,goals){
      res.send(goals);
    });
  }
};
module.exports=goalMasterController;
