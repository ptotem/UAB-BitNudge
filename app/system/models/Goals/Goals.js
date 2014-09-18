var GoalsCollection=require('./GoalsCollection.js');
var mongoose=require('mongoose');
var Goals={
  createGoal:function(organizationId,data,callback){
    data.organizationId=mongoose.Types.ObjectId(organizationId);
    data.createdAt=new Date();
    if(data.steps)
      data.totalSteps=data.steps.length;
    var l=new GoalsCollection(data);
    l.save(callback);
    return true;
  },
  // addMedalToGoal:function(goalId,medalId,callback){
  //   GoalsCollection.update({_id:goalId},{$push:{medals:medalId}},callback);
  // },
  // addStepToGoal:function(goalId,stepData,callback){
  //   GoalsCollection.update({_id:goalId},{$push:{steps:stepData}},callback);
  // },
  getGoal:function(id,fields,options,populationData,callback){
    GoalsCollection.findOne({_id:id},callback);
  },
  getGoalsOfOrganization:function(orgId,callback){
    GoalsCollection.find({orgId:orgId},callback);
  },
  getPointsToBeIncremented:function(goalId,callback){
    Goals.getGoal(goalId,function(err,obj){
      if(err) return callback(err,0);
      if(obj.length==obj.lengthCompleted)
        return callback(null,points);
      return callback(null,0);
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
