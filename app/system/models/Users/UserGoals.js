var UserGoalsCollection=require('./UserGoalsCollection.js');
var UserGoals={
  createUserGoal:function(organizationId,data){
    data.organizationId=mongoose.Schema.Types.ObjectId(organizationId);
    data.createdAt=new Date();
    var l=new UserGoalsCollection(data);
    l.save();
    return true;
  },
  getUserGoal:function(userId,goalId,fields,options,populationData,callback){
    UserGoalsCollection.findOne({userId:userId,goalId:goalId},fields,options).populate(populationData).exec(callback);
  },
  approveUserGoal:function(id,callback){
    TransactionsCollection.update({_id:id},{$set:{moderated:true}},callback);
  },
  getLiveUserGoals:function(userId,callback){
    UserGoalsCollection.findOne({userId:userId}).populate({path:'goalId',match:{endDate:{$lte:new Date()},startDate:{$gte:new Date()}}}).exec(callback);
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
  updateUserGoal:function(id,updateData,callback){
    UserGoalsCollection.update({_id:id},{$set:updateData},callback);
  }
};
module.exports=UserGoals;
