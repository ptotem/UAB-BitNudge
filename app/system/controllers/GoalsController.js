var UserGoalsModel=require('../models/Users').Goals;
var TransactionMasterCollection=require('../models/TransactionMaster/TransactionMasterCollection.js');
var GoalsController={
  createGoal:function(req,res){
    UserGoalsModel.createGoal(req.params.userId,req.body,function(err,obj){
      if(err)res.send(err);
      else res.send("success");
    });
  },
  updateGoal:function(req,res){
    UserGoalsModel.updateGoalOfUser(req.params.userId,req.body,function(err,obj){
      if(err) return res.send(err);
      res.send(obj);
    });
  },
  getGoal:function(req,res){
    GoalsModel.getGoal(req.params.id,function(err,obj){
      res.send(obj);
    });
  },
  // getGoalsOfUser:function(req,res){
  //   UsersModel.getGoals(userId,function(err,goals){
  //     res.send(goals);
  //   });
  // },
  getLiveUserGoals:function(req,res){
    UserGoalsModel.getLiveGoalsOfUser(req.params.userId,new Date(),function(err,objs){
      TransactionMasterCollection.populate(objs,{path:"goals.transactions.transactionMaster",model:'transactionMasters',select:'name'},function(err1,objs1){
        if(err) res.send(err);
        res.send(objs1[0]);
      });
    });
  }
  // assignGoalToUser:function(req,res){
  //   data.userId=userId;
  //   data.goalId=goalId;
  //   UserGoalsModel.createUserGoal(orgId,data);
  //   res.send();
  // }
  // approveGoalOfUser:function(req,res){
  //   GoalsModel.getGoal(goalId,function(err,goalObj){
  //     UserGoalsModel.approveUserGoal(userId,goalId,function(err,obj){
  //       if(err) return handleError(err);
  //     });
  //     UserPointsModel.UserMonthPoints.addPointsObject(obj.userId,new Date(),{pointsEarned:goalObj.points,type:"goals",from:goalObj._id},function(){});
  //     UserPointsModel.UserQuarterPoints.addPoints(obj.userId,new Date(),goalObj.points,function(){});
  //     UserPointsModel.UserYearPoints.addPoints(obj.userId,new Date(),goalObj.points,function(){});
  //     UsersModel.incrementUserCashAndPointsBy(obj.userId,goalObj.points,function(){});
  //     EventsController.onApproved(transObj._id);
  //   });
  // }
  // deleteGoal:function(req,res){
  //   GoalsModel.deleteGoal(id,function(){});
  // }
};
module.exports=GoalsController;
