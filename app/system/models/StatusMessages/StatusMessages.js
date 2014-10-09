var StatusMessageCollection=require('./StatusMessagesCollection.js');
var mongoose=require('mongoose');
var StatusMessage= {
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
    getStatusMessage:function(id,fields,options,populationData,callback){
      StatusMessageCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
    },
    getStatusMessagesOfUser:function(userId,fields,options,populationData,callback){
      StatusMessageCollection.find({userId:userId},fields,options).populate(populationData).exec(callback);
    },
    updateStatusMessage:function(id,updateData,callback){
      StatusMessageCollection.update({_id:id},{$set:updateData},callback);
    },
    likeStatusMessage:function(id,likerId,callback){
      StatusMessageCollection.update({_id:id},{$push:{likes:likerId},$inc:{totalLikes:1}},callback);
    },
    commentOnStatusMessage:function(id,commentObj,callback){
      console.log(commentObj);
      if(!commentObj.createdAt)
        commentObj.createdAt=new Date();
      StatusMessageCollection.update({_id:id},{$push:{messages:commentObj},$inc:{totalComments:1}},callback);
    }
};
module.exports=StatusMessage;
