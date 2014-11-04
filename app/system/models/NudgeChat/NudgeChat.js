var NudgeChatCollection=require('./NudgeChatCollection.js');
var mongoose=require('mongoose');

var NudgeChat={
  createNudgeChat:function(organizationId,userId,data,callback){
    data.orgId=mongoose.Types.ObjectId(organizationId);
    data.createdAt=new Date();
    data.userId=mongoose.Types.ObjectId(userId);
    var l=new NudgeChatCollection(data);
    l.save(callback);
  },
  getNudgeChat:function(id,fields,options,populationData,callback){
    NudgeChatCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getNudgeChatOfUser:function(userId,fields,options,populationData,callback){
    NudgeChatCollection.find({userId:userId},fields,options).populate(populationData).exec(callback);
  },
  getNudgeChatSchema:function(){
    return NudgeChatCollection.Schema;
  },
  deleteNudgeChat:function(userId,callback){
    NudgeChatCollection.remove({userId:userId},callback);
  },
  addMessageToChat:function(userId,message,callback){
    NudgeChatCollection.update({userId:userId},{$push:{messages:message}},callback);
  }
  // updateNudgeChat:function(id,fieldName,value,callback){
  //   var temp={};
  //   temp[fieldName]=value;
  //   NudgeChatCollection.update({_id:id},{$set:temp},callback);
  // }
};
module.exports=NudgeChat;
