var GoalsCollection=require('./GoalsCollection.js');
var Goals={
  initialize:function(server){
    console.log("messages initialized");
  },
  createGoal:function(organizationId,data){
    data.organizationId=organizationId;
    var l=new GoalsCollection(data);
    l.save();
    return true;
  },
  addMedalToGoal:function(goalId,medalId,callback){
    GoalsCollection.update({_id:goalId},{$push:{medals:medalId}},callback);
  },
  getGoal:function(id,callback){
    GoalsCollection.findOne({_id:id},callback);
  },
  getGoalsOfOrganization:function(orgId,callback){
    GoalsCollection.find({organizationId:orgId},callback);
  },
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
    GoalsCollection.update({_id:id},{$inc:{lengthCompleted:1},callback);
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
  updateGoal:function(id,fieldName,value,callback){
    var temp={};
    temp[fieldName]=value;
    GoalsCollection.update({_id:id},{$set:temp},callback);
  }
};
module.exports=Goals;
