var SimulatedUsersCollection=require('./SimulatedUsersCollection.js');
var mongoose=require('mongoose');
var SimulatedUserGoals={
  createGoal:function(userId,goalObj,callback){
    if(!goalObj.createdAt)
      goalObj.createdAt=new Date();
    SimulatedUsersCollection.update({_id:userId},{$push:{goals:goalObj}},callback);
  },
  getGoal:function(userId,goalId,fields,options,populationData,callback){
    SimulatedUsersCollection.findOne({userId:userId,'goals._id':goalId},{'goals.$':1},options).populate(populationData).exec(callback);
  },
  getLiveGoalsOfSimulatedUser:function(userId,currDate,callback){
    SimulatedUsersCollection.aggregate({$match:{_id:mongoose.Types.ObjectId(userId)}}, {$unwind:'$goals'}, {$match:{'goals.startDate':{$lte:currDate},'goals.endDate':{$gte:currDate}}}, {$group:{_id:'$_id',goals:{$push:'$goals'}}},callback);
  },
  getLiveGoalsOfSimulatedUserWithQuery:function(userId,query,currDate,callback){
    query['goals.startDate']={$lte:currDate};
    query['goals.endDate']={$gte:currDate};
    SimulatedUsersCollection.aggregate({$match:{_id:mongoose.Types.ObjectId(userId)}}, {$unwind:'$goals'}, {$match:query}, {$group:{_id:'$_id',goals:{$push:'$goals'}}},callback);
  },
  //the callback takes arg err and return value.
  // getSimulatedUserGoalProgress:function(userId,goalId,callback){
  //   SimulatedUserGoals.getSimulatedUserGoal(userId,goalId,"",{},{path:'goalId'},function(err,obj){
  //     if(err) return callback(err,null);
  //     var total=obj.totalSteps;
  //     var comp=obj.steps.length;
  //     if(total&&comp)
  //       return callback(err,(comp/total)*100);
  //     else return callback(err,null);
  //   });
  // },
  getSimulatedUserGoalSchema:function(){
    return SimulatedUsersCollection.Schema;
  },
  deleteSimulatedUserGoal:function(id,callback){
    SimulatedUsersCollection.remove({_id:id},callback);
  },
  updateGoalOfSimulatedUser:function(userId,goalId,goalData,callback){
    SimulatedUsersCollection.update({_id:id,"goals._id":goalId},{$set:{'goals.$':goalData}},callback);
  }
};
module.exports=SimulatedUserGoals;
