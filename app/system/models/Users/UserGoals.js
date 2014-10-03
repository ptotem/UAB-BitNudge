var UsersCollection=require('../Users/UsersCollection.js');
var mongoose=require('mongoose');
var UserGoals={
  addGoal:function(userId,goalObj,callback){
    if(!goalObj.createdAt)
      goalObj.createdAt=new Date();
    UsersCollection.update({_id:userId},{$push:{goals:goalObj}},callback);
  },
  getGoal:function(userId,goalId,fields,options,populationData,callback){
    UsersCollection.findOne({userId:userId,'goals._id':goalId},{'goals.$':1},options).populate(populationData).exec(callback);
  },
  getLiveGoalsOfUser:function(userId,currDate,callback){
    UsersCollection.aggregate({$match:{_id:mongoose.Types.ObjectId(userId)}}, {$unwind:'$goals'}, {$match:{'goals.startDate':{$lte:currDate},'goals.endDate':{$gte:currDate}}}, {$group:{_id:'$_id',goals:{$push:'$goals'}}},callback);
  },
  //the callback takes arg err and return value.
  // getUserGoalProgress:function(userId,goalId,callback){
  //   UserGoals.getUserGoal(userId,goalId,"",{},{path:'goalId'},function(err,obj){
  //     if(err) return callback(err,null);
  //     var total=obj.totalSteps;
  //     var comp=obj.steps.length;
  //     if(total&&comp)
  //       return callback(err,(comp/total)*100);
  //     else return callback(err,null);
  //   });
  // },
  getUserGoalSchema:function(){
    return UsersCollection.Schema;
  },
  deleteUserGoal:function(id,callback){
    UsersCollection.remove({_id:id},callback);
  },
  updateGoalOfUser:function(userId,goalId,goalData,callback){
    UsersCollection.update({_id:id,"goals._id":goalId},{$set:{'goals.$':goalData}},callback);
  }
};
module.exports=UserGoals;
