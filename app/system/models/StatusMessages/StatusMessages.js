var StatusMessageCollection=require('./StatusMessagesCollection.js');

var StatusMessage= {
    getStatusMessageDetail:function(id,fieldName,callback){
        StatusMessageCollection.find(({'_id' :id}).fieldName,callback);
    },
    getStatusMessageSchema:function(){
        return StatusMessageCollection.Schema;
    },
    createStatusMessage:function(orgId,userId,data,callback){
      data.orgId=mongoose.Types.ObjectId(orgId);
      data.userId=mongoose.Types.ObjectId(userId);
      data.createdAt=new Date();
      var message=new StatusMessageCollection(data);
      message.save(callback);
    },
    deleteStatusMessage:function(id,callback){
        StatusMessageCollection.remove({'_id':id},callback);
    },
    getStatusMessage:function(id,callback){
        StatusMessageCollection.findOne({_id:id},callback);
    },
    getStatusMessagesOfUser:function(userId,callback){
        StatusMessageCollection.findOne({userId:userId},callback);
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
};
//if()
module.exports=StatusMessage;
