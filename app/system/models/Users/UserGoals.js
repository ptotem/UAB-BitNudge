var UsersCollection=require('../Users/UsersCollection.js');
var mongoose=require('mongoose');
var UserGoals={
  createGoal:function(userId,goalObj,callback){
//    if(!goalObj.createdAt)
    goalObj.createdAt=new Date();
    UsersCollection.update({_id:userId},{$push:{goals:goalObj}},callback);
  },
  assignChallengeToUser:function(userId,goalObj,callback){
    if(!goalObj.createdAt)
      goalObj.createdAt=new Date();
    if(goalObj.goalType!="challenge")
      goalObj.goalType="challenge";
    UsersCollection.update({_id:userId},{$push:{goals:goalObj}},callback);
  },
  getGoal:function(userId,goalId,fields,options,populationData,callback){
    UsersCollection.findOne({userId:userId,'goals._id':goalId},{'goals.$':1},options).populate(populationData).exec(callback);
  },
  getLiveGoalsOfUser:function(userId,currDate,callback){
    UsersCollection.aggregate({$match:{_id:mongoose.Types.ObjectId(userId)}},{$unwind:'$goals'},{$match:{'goals.startDate':{$lte:currDate},'goals.endDate':{$gte:currDate},'goals.goalType':"goal"}},{$group:{_id:'$_id',goals:{$push:'$goals'}}},callback);
  },
  getLiveChallengesOfUser:function(userId,currDate,callback){
    UsersCollection.aggregate({$match:{_id:mongoose.Types.ObjectId(userId)}}, {$unwind:'$goals'}, {$match:{'goals.startDate':{$lte:currDate},'goals.endDate':{$gte:currDate}},'goals.goalType':"challenge"}, {$group:{_id:'$_id',challenges:{$push:'$goals'}}},callback);
  },
  getChallenge:function(userId,goalId,fields,options,populationData,callback){
    UsersCollection.findOne({userId:userId,'goals._id':goalId},{'goals.$':1},options).populate(populationData).exec(callback);
  },
  // getLiveGoalsOfUserWithQuery:function(userId,query,currDate,callback){
  //   query['goals.startDate']={$lte:currDate};
  //   query['goals.endDate']={$gte:currDate};
  //   UsersCollection.aggregate({$match:{_id:mongoose.Types.ObjectId(userId)}}, {$unwind:'$goals'}, {$match:query}, {$group:{_id:'$_id',goals:{$push:'$goals'}},'goals.goalType':"goal"},callback);
  // },
  getLiveGoalsAndChallengesOfUser:function(userId,currDate,callback){
    UsersCollection.aggregate({$match:{_id:mongoose.Types.ObjectId(userId)}}, {$unwind:'$goals'}, {$match:{'goals.startDate':{$lte:currDate},'goals.endDate':{$gte:currDate}}}, {$group:{_id:'$_id',goals:{$push:'$goals'}}},callback);
  },
  getLiveGoalsAndChallengesOfUserWithQuery:function(userId,query,currDate,callback){
    query['goals.startDate']={$lte:currDate};
    query['goals.endDate']={$gte:currDate};
    UsersCollection.aggregate({$match:{_id:mongoose.Types.ObjectId(userId)}}, {$unwind:'$goals'}, {$match:query}, {$group:{_id:'$_id',goals:{$push:'$goals'}}},callback);
  },
  getUserGoalSchema:function(){
    return UsersCollection.Schema;
  },
  deleteUserGoal:function(id,callback){
    UsersCollection.remove({_id:id},callback);
  },
  updateGoalOfUser:function(userId,goalId,goalData,callback){
    UsersCollection.update({_id:userId,"goals._id":mongoose.Types.ObjectId(goalId)},{$set:{'goals.$':goalData}},callback);
  }
};
module.exports=UserGoals;
