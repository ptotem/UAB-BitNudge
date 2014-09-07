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
  getGoal:function(id,callback){
    GoalsCollection.findOne({_id:id},callback);
  },
  getGoalsOfOrganization:function(orgId,callback){
    GoalsCollection.find({organizationId:orgId},callback);
  },
  addPlayer:function(id,userId,callback){
    GoalsCollection.update({_id:id},{$push:{players:userId}},callback);
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
