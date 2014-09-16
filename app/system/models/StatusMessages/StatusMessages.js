var StatusMessageCollection=require('./StatusMessagesCollection.js');

var StatusMessage= {
    initialize: function (server) {
        console.log("StatusMessage initialized");
    },
    getStatusMessageDetail:function(id,fieldName,callback){
        StatusMessageCollection.find(({'_id' :id}).fieldName,callback);
    },

    getStatusMessageSchema:function(){
        return StatusMessageCollection.Schema;
    },
    createStatusMessage:function(data){
        var message=new StatusMessageCollection(data);
        message.created_at=new Date();
        message.save();
        return true;
    },
    deleteStatusMessage:function(id,callback){
        StatusMessageCollection.remove({'_id':id},callback);
    },
    getStatusMessage:function(id,callback){
        StatusMessageCollection.findOne({_id:id},callback);
    },
    updateStatusMessage:function(id,updateDate,callback){
        StatusMessageCollection.update({_id:id},{$set:updateData},callback);
    },
    addActionIntoStatusMessage:function(id,action_id,callback)
    {
        StatusMessageCollection.update({_id:id},{$push:{action:action_id}},callback);
    },
    removeActionFromStatusMessage:function(id,action_id,callback)
    {
        StatusMessageCollection.update({_id:id},{$pull:{action:action_id}},callback);
    }
//    AddRoles_toUser:function
}
//if()
module.exports=StatusMessage;
