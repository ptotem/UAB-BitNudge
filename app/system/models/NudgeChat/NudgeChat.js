var NudgeChatCollection=require('./NudgeChatCollection.js');

var NudgeChat={
  createNudgeChat:function(organizationId,data){
    data.orgId=organizationId;
    data.createdAt=new Date();
    var l=new NudgeChatCollection(data);
    l.save();
    return true;
  },
  getNudgeChat:function(id,fields,options,populationData,callback){
    NudgeChatCollection.findOne({_id:id},fields,options,populationData,callback);
  },
  getNudgeChatOfUser:function(userId,fields,options,populationData,callback){
    NudgeChatCollection.find({userId:userId},fields,options,populationData,callback);
  },
  getNudgeChatSchema:function(){
    return NudgeChatCollection.Schema;
  },
  deleteNudgeChat:function(id,callback){
    NudgeChatCollection.remove({_id:id},callback);
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
