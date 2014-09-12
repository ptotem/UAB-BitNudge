var NudgeMailboxCollection=require('./NudgeMailboxCollection.js');

var NudgeMailbox={
  createNudgeMailbox:function(organizationId,data){
    data.orgId=organizationId;
    data.createdAt=new Date();
    var l=new NudgeMailboxCollection(data);
    l.save();
    return true;
  },
  getNudgeMailbox:function(id,fields,options,populationData,callback){
    NudgeMailboxCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getNudgeMailboxOfUser:function(userId,callback){
    NudgeMailboxCollection.find({userId:userId},fields,options).populate(populationData).exec(callback);
  },
  addMailToUserMailbox:function(userId,mailId,callback){
    NudgeMailboxCollection.update({userId:userId},{$push:{mails:mailId}},callback);
  },
  getNudgeMailboxSchema:function(){
    return NudgeMailboxCollection.Schema;
  },
  deleteNudgeMailbox:function(id,callback){
    NudgeMailboxCollection.remove({_id:id},callback);
  },
};
