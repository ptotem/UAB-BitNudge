var NudgeMailboxCollection=require('./NudgeMailboxCollection.js');
var mongoose=require('mongoose');

var NudgeMailbox={
  createNudgeMailbox:function(organizationId,userId,data,callback){
    data.orgId=mongoose.Types.ObjectId(organizationId);
    data.createdAt=new Date();
    data.userId=mongoose.Types.ObjectId(userId);
    var l=new NudgeMailboxCollection(data);
    l.save(callback);
  },
  getNudgeMailbox:function(id,fields,options,populationData,callback){
    NudgeMailboxCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getNudgeMailboxOfUser:function(userId,fields,options,populationData,callback){
    NudgeMailboxCollection.findOne({userId:userId},fields,options).populate(populationData).exec(callback);
  },
  addMailToUserMailbox:function(userId,mailId,callback){
    NudgeMailboxCollection.update({userId:userId},{$push:{mails:mailId}},callback);
  },
  getNudgeMailboxSchema:function(){
    return NudgeMailboxCollection.Schema;
  },
  deleteNudgeMailbox:function(userId,callback){
    NudgeMailboxCollection.remove({userId:userId},callback);
  }
};
module.exports=NudgeMailbox;
