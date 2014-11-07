var RolesCollection=require('./RolesCollection.js');
var mongoose=require('mongoose');
var Role= {
    createRole:function(orgId,data,callback){
        var role=new RolesCollection(data);
        role.orgId=mongoose.Types.ObjectId(orgId);
        role.createdAt=new Date();
        role.save(callback);
    },
    deleteRole:function(id,callback){
        RolesCollection.remove({'_id':id},callback);
    },
    getRole:function(id,fields,options,populationData,callback){
        RolesCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
    },
    getRolesFromQuery:function(query,fields,options,populationData,callback){
      RolesCollection.find(query,fields,options).populate(populationData).exec(callback);
    },
    updateRole:function(id,updateData,callback){
        RolesCollection.update({_id:id},{$set:updateData},callback);
    },
    addActionIntoRole:function(id,action_id,callback) {
        RolesCollection.update({_id:id},{$push:{action:action_id}},callback);
    },
    removeActionIntoRole:function(id,action_id,callback) {
        RolesCollection.update({_id:id},{$pull:{action:action_id}},callback);
    }
};
module.exports=Role;
