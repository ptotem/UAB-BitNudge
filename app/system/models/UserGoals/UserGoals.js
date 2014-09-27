var UserGoalsCollection=require('../Users/UsersCollection.js');
var mongoose=require('mongoose');
var UserGoals={
  createGoal:function(userId,goalObj,callback){
    goalObj.createdAt=new Date();
    // GoalsMasterModel.getGoalMaster(data.goalMaster,"","","transactions",function(err,goalMaster){
    //   // goalMaster.transactions.forEach(function(transaction){
    //   //   data.transactions.push({transaction})
    //   //   UserGoalsCollection.update({_id:userId},{$push:{goals:goalObj}})
    //   // });
    // });
    UserGoalsCollection.update({_id:userId},{$push:{goals:goalObj}},callback);
  },
  getUserGoal:function(userId,goalId,fields,options,populationData,callback){
    UserGoalsCollection.findOne({userId:userId,goalId:goalId},fields,options).populate(populationData).exec(callback);
  },
  approveUserGoal:function(id,callback){
    TransactionsCollection.update({_id:id},{$set:{moderated:true}},callback);
  },
  getLiveGoalsOfUser:function(userId,currDate,callback){
    // UserGoalsCollection.aggregate({$match:{_id:userId}}, {$unwind:'$goals'}, {$match:{'goals.startDate':{$lte:currDate},'goals.endDate':{$gte:currDate}}}, {$group:{_id:'$_id',goals:{$push:'$goals.name'}}},callback);
    UserGoalsCollection.aggregate({$match:{_id:mongoose.Types.ObjectId(userId)}}, {$unwind:'$goals'}, {$match:{'goals.startDate':{$lte:currDate},'goals.endDate':{$gte:currDate}}}, {$group:{_id:'$_id',goals:{$push:'$goals'}}},callback);
  },
  //the callback takes arg err and return value.
  getUserGoalProgress:function(userId,goalId,callback){
    UserGoals.getUserGoal(userId,goalId,"",{},{path:'goalId'},function(err,obj){
      if(err) return callback(err,null);
      var total=obj.totalSteps;
      var comp=obj.steps.length;
      if(total&&comp)
        return callback(err,(comp/total)*100);
      else return callback(err,null);
    });
  },
  getUserGoalSchema:function(){
    return UserGoalsCollection.Schema;
  },
  deleteUserGoal:function(id,callback){
    UserGoalsCollection.remove({_id:id},callback);
  },
  updateGoalOfUser:function(id,goalId,goalData,callback){
    UserGoalsCollection.update({_id:id,"goals._id":goalId},{$set:{'goals.$':goalData}},callback);
  }
};
module.exports=UserGoals;
