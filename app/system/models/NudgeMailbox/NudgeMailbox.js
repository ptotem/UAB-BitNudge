var NudgeMailboxCollection=require('./NudgeMailboxCollection.js');
var mongoose=require('mongoose');
var NudgeMailbox={
  createNudgeMailbox:function(orgId,data){
    data.orgId=mongoose.Types.ObjectId(orgId);
    data.createdAt=new Date();
    var l=new NudgeMailboxCollection(data);
    l.save();
    return true;
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
  deleteNudgeMailbox:function(id,callback){
    NudgeMailboxCollection.remove({_id:id},callback);
  }
};
module.exports=NudgeMailbox;