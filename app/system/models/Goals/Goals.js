var GoalsCollection=require('./GoalsCollection.js');
var mongoose = require('mongoose');
var Goals={
  createGoal:function(orgId,data){
      data.createdAt=new Date();
      data.orgId=mongoose.Types.ObjectId(orgId);
      var l=new GoalsCollection(data);
      l.save();
      return true;
  },
  addMedalToGoal:function(goalId,medalId,callback){
    GoalsCollection.update({_id:goalId},{$push:{medals:medalId}},callback);
  },
  addStepToGoal:function(goalId,stepData,callback){
    GoalsCollection.update({_id:goalId},{$push:{steps:stepData}},callback);
  },
  getGoal:function(id,fields,options,populationData,callback){
    GoalsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  // getGoalsOfOrganization:function(orgId,callback){
  //   GoalsCollection.find({organizationId:orgId},callback);
  // },
  addPlayerToGoal:function(id,userId,callback){
    //TODO:- add this goal to the list of goals in user
    GoalsCollection.update({_id:id},{$push:{players:userId}},callback);
  },
  findLiveGoalOfUserOfType:function(userId,transactionType,currDate,callback){
    GoalsCollection.findOne({players:{$elemMatch:userId},startDate:{$lte:currDate},endDate:{$gte:currDate},transactionType:transactionType},callback);
  },
  getPointsToBeIncremented:function(goalId,callback){
    Goals.getGoal(goalId,function(err,obj){
      if(err) return callback(err,0);
      if(obj.length==obj.lengthCompleted)
        return callback(null,points);
      return callback(null,0);
    });
  },
  incrementCompletedCount:function(id,callback){
    GoalsCollection.update({_id:id},{$inc:{lengthCompleted:1}},callback);
  },
  //the callback takes arg err and return value.
  getGoalProgress:function(userId,goalId,callback){
    Goals.getGoal(goalId,function(err,obj){
      if(err) return callback(err,null);
      var total=obj.length;
      var comp=obj.lengthCompleted;
      if(total&&comp)
        callback(err,(comp/total)*100);
      else return callback(err,null);
    });
  },
  getGoalSchema:function(){
    return GoalsCollection.Schema;
  },
  deleteGoal:function(id,callback){
    GoalsCollection.remove({_id:id},callback);
  },
  updateGoal:function(id,updateData,callback){
    GoalsCollection.update({_id:id},{$set:updateData},callback);
  }
};
module.exports=Goals;
