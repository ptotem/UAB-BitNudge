var GoalMasterCollection=require('./GoalMasterCollection.js');
var mongoose=require('mongoose');
var GoalMaster= {
    getGoalMasterSchema:function(){
        return GoalMasterCollection;
    },
    createGoalMaster:function(orgId,data,callback){
        data.orgId=mongoose.Types.ObjectId(orgId);
        data.createdAt=new Date();
        var goalMaster=new GoalMasterCollection(data);
        goalMaster.save(callback);
    },
    deleteGoalMaster:function(id,callback){
        GoalMasterCollection.remove({'_id':id},callback);
    },
    getGoalMaster:function(id,fields,options,populationData,callback){
        GoalMasterCollection.findOne({_id:mongoose.Types.ObjectId(id)},fields,options).populate(populationData).exec(callback);
    },
    getGoalMastersOfUser:function(userId,fields,options,populationData,callback){
        GoalMasterCollection.find({creator:userId},fields,options).populate(populationData).exec(callback);
    },
    getAllGoalMasters:function(fields,options,populationData,callback){
        GoalMasterCollection.find({},fields,options).populate(populationData).exec(callback);
    }
};
module.exports=GoalMaster;
