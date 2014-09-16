var UserGoalsCollection=require('./UserGoalsCollection.js');
var UserGoals={
  createUserGoal:function(organizationId,data){
    data.organizationId=organizationId;
    data.createdAt=new Date();
    var l=new UserGoalsCollection(data);
    l.save();
    return true;
  },
  addMedalToUserGoal:function(goalId,medalId,callback){
    UserGoalsCollection.update({_id:goalId},{$push:{medals:medalId}},callback);
  },
  addStepToUserGoal:function(goalId,stepData,callback){
    UserGoalsCollection.update({_id:goalId},{$push:{steps:stepData}},callback);
  },
  getUserGoal:function(id,fields,options,populationData,callback){
    UserGoalsCollection.findOne({_id:id},callback);
  },
  // getUserGoalsOfOrganization:function(orgId,callback){
  //   UserGoalsCollection.find({organizationId:orgId},callback);
  // },
  addPlayerToUserGoal:function(id,userId,callback){
    //TODO:- add this goal to the list of goals in user
    UserGoalsCollection.update({_id:id},{$push:{players:userId}},callback);
  },
  findLiveUserGoalOfUserOfType:function(userId,transactionType,currDate,callback){
    UserGoalsCollection.findOne({players:{$elemMatch:userId},startDate:{$lte:currDate},endDate:{$gte:currDate},transactionType:transactionType},callback);
  },
  approveUserGoal:function(id,callback){
    TransactionsCollection.update({_id:id},{$set:{moderated:true}},callback);
  },
  getPointsToBeIncremented:function(goalId,callback){
    UserGoals.getUserGoal(goalId,function(err,obj){
      if(err) return callback(err,0);
      if(obj.length==obj.lengthCompleted)
        return callback(null,points);
      return callback(null,0);
    });
  },
  incrementCompletedCount:function(id,callback){
    UserGoalsCollection.update({_id:id},{$inc:{lengthCompleted:1}},callback);
  },
  //the callback takes arg err and return value.
  getUserGoalProgress:function(userId,goalId,callback){
    UserGoals.getUserGoal(goalId,function(err,obj){
      if(err) return callback(err,null);
      var total=obj.length;
      var comp=obj.lengthCompleted;
      if(total&&comp)
        callback(err,(comp/total)*100);
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
