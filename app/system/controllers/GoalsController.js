var UserGoalsModel=require('../models/Users').Goals;
var GoalMasterModel=require('../models/GoalMaster');
var TransactionMasterCollection=require('../models/TransactionMaster/TransactionMasterCollection.js');
var GoalsController={
  createGoal:function(req,res){
    //if the criteria is Action, then it must be stored in the goalMaster so that user can reuse it later.
    //This is for development purposes.
    //TODO:- Change to req.user._id once the authorization module is included.
    req.body.goalType="goal";
    if(req.body.criteria=="Action"){
      // var newGoalMaster=JSON.parse(JSON.stringify(req.body));
      // newGoalMaster.
//      req.body.creator="54181598d465d283167f8d13";
      GoalMasterModel.createGoalMaster(req.params.orgId,req.body,function(err,goalMasterObj){
        if(!err)
          UserGoalsModel.createGoal(req.params.userId,req.body,function(err,obj){
            if(err)res.send(err);
            else res.send("success");
          });
      });
    }
    else{
      req.body.subgoals.forEach(function(subgoalObj,index){
        GoalMasterModel.getGoalMaster(subgoalObj.subgoal,"","","",function(err,subgoalMasterObj){
          subgoalObj.allowedTransactions=subgoalMasterObj.action.allowedTransactions;
          console.log(subgoalMasterObj);
          if(index==req.body.subgoals.length-1){
            UserGoalsModel.createGoal(req.params.userId,req.body,function(err,obj){
              if(err)res.send(err);
              else res.send("success");
            });
          }
        });
      });
    } 
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
        if(objs[0]&&objs[0].goals)
          res.send(objs[0].goals);
        else res.send(objs[0]);
      });
    });
  },
  getCreatedGoalsOfUser:function(req,res){
    GoalMasterModel.getGoalMastersOfUser(req.params.userId,"","","",function(err,goalMasters){
      if(err)
        res.send(err);
      else res.send(goalMasters);
    });
  },
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
