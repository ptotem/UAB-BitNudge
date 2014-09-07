var GoalTypesCollection=require('./GoalTypesCollection.js');
var GoalTypes={
  initialize:function(server){
    console.log("medals initialized");
  },
  createGoalType:function(organizationId,name){
    var l=new GoalTypesCollection({organizationId:organizationId,name:name});
    l.save();
    return true;
  },
  getGoalType:function(id,callback){
    GoalTypesCollection.findOne({_id:id},callback);
  },
  getGoalTypesOfOrganization:function(orgId,callback){
    GoalTypesCollection.find({organizationId:orgId},callback);
  },
  getGoalTypeSchema:function(){
    return GoalTypesCollection.Schema;
  },
  // deleteGoalType:function(id,callback){
  //   GoalTypesCollection.remove({_id:id},callback);
  // },
  updateGoalType:function(id,fieldName,value,callback){
    var temp={};
    temp[fieldName]=value;
    GoalTypesCollection.update({_id:id},{$set:temp},callback);
  }
};
module.exports=GoalTypes;
