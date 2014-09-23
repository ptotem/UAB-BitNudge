var GoalMasterCollection=require('./GoalMasterCollection.js');
var mongoose=require('mongoose');
var GoalMaster= {
    getGoalMasterDetail:function(goal,fields,callback){
        GoalMasterCollection.findOne(({'_id' :goal},fields),callback);
    },
    getGoalMasterSchema:function(){
        return GoalMasterCollection;
    },
    createGoalMaster:function(data,callback){
        var goalMaster=new GoalMasterCollection(data);
        goalMaster.createdAt=new Date();
        goalMaster.save(callback);
        return true;
    },
    deleteGoalMaster:function(id,callback){
        GoalMasterCollection.remove({'_id':id},callback);
    },
    getGoalMaster:function(id,fields,options,populationData,callback){
        GoalMasterCollection.findOne({_id:mongoose.Types.ObjectId(id)},fields,options).exec(callback);
    },
    setGoalMasterFieldById:function(id,fieldName,value,callback){
        GoalMasterCollection.update({_id:mongoose.Types.ObjectId(id)},{$set:{fieldName:value}},callback);
    }
};
module.exports=GoalMaster;


