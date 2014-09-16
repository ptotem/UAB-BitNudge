var RolesCollection=require('./RolesCollection.js');

var Role= {
    getRoleDetail:function(org,fieldName){
        RolesCollection.find(({'_id' :org}).fieldName,callback);
    },

    getRoleSchema:function(){
        return RolesCollection.Schema;
    },
    createRole:function(data){
        var role=new RolesCollection(data);
        role.created_at=new Date();
        role.save();
        return true;
    },
    deleteRole:function(id,callback){
        RolesCollection.remove({'_id':id},callback);
    },
    getRole:function(id,callback){
        RolesCollection.findOne({_id:id},callback);
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
