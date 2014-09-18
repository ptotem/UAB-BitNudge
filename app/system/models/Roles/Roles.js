var RolesCollection=require('./RolesCollection.js');
var mongoose=require('mongoose');
var Role= {
    initialize: function (server) {
        console.log("Roles initialized");
    },
    //getRoleDetail:function(org,fields,options,populationData,callback){
    //    RolesCollection.find(({'_id' :org}),fields,options).populate(populationData).exec(callback);
//    },

    getRoleSchema:function(){
        return RolesCollection.Schema;
    },
    createRole:function(orgId,data){
        var role=new RolesCollection(data);
        role.orgId=mongoose.Types.ObjectId(orgId)
        role.createdAt=new Date();
        role.save();
        return true;
    },
    deleteRole:function(id,callback){
        RolesCollection.remove({'_id':id},callback);
    },
    getRole:function(id,fields,options,populationData,callback){
        RolesCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
    },
    setRoleFieldById:function(id,fieldName,value,callback){
        RolesCollection.update({_id:id},{$set:{fieldName:value}},callback);
    },
    updateRole:function(id,updateData,callback){
        RolesCollection.update({_id:id},{$set:updateData},callback);
    },
    add_actionIntoRole:function(id,action_id,callback)
    {
        RolesCollection.update({_id:id},{$push:{action:action_id}},callback);
    },
    remove_actionIntoRole:function(id,action_id,callback)
    {
        RolesCollection.update({_id:id},{$pull:{action:action_id}},callback);
    }
//    AddRoles_toUser:function
}
//if()
module.exports=Role;
