var GoalsModel=require('../models/Goals');

var GoalsController={
  createGoal:function(req,res){
    GoalsModel.createGoal(orgId,data);
  },
  // updateGoal:function(req,res){
  //   GoalsModel.UpdateGoal(id,updateData,function(err,obj){
  //     res.send(obj);
  //   });
  // },
  getGoal:function(req,res){
    GoalsModel.getGoal(id,function(err,obj){
      res.send(obj);
    });
  },
  getGoalsOfUser:function(req,res){
    UsersModel.getGoals(userId,function(err,goals){
      res.send(goals);
    });
  },
  getLiveUserGoals:function(req,res){
    UserGoalsModel.getLiveUserGoals(userId,function(err,objs){
      res.send(objs);
    });
  },
  assignGoalToTeam:function(req,res){
    TeamsModel.getTeam(teamId,function(err,team){
      team.members.forEach(function(memberId){
        data.userId=memberId;
        data.goalId=goalId;
        UserGoalsModel.createUserGoal(orgId,data);
      });
      res.send(obj);
    });
  },
  assignGoalToUser:function(req,res){
    data.userId=userId;
    data.goalId=goalId;
    UserGoalsModel.createUserGoal(orgId,data);
    res.send();
  },
  approveGoalOfUser:function(req,res){
    GoalsModel.getGoal(goalId,function(err,goalObj){
      UserGoalsModel.approveUserGoal(userId,goalId,function(err,obj){
        if(err) return handleError(err);
      });
      UserPointsModel.UserMonthPoints.addPointsObject(obj.userId,new Date(),{pointsEarned:goalObj.points,type:"goal",from:goalObj._id},function(){});
      UserPointsModel.UserQuarterPoints.addPoints(obj.userId,new Date(),goalObj.points,function(){});
      UserPointsModel.UserYearPoints.addPoints(obj.userId,new Date(),goalObj.points,function(){});
      UsersModel.incrementUserCashAndPointsBy(obj.userId,goalObj.points,function(){});
      EventsController.onApproved(transObj._id);
    });
  },
  // deleteGoal:function(req,res){
  //   GoalsModel.deleteGoal(id,function(){});
  // }
};
module.exports=GoalsController;
