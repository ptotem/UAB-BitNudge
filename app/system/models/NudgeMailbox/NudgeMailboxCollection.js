var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var NudgeMailboxSchema=new Schema({
  userId:Schema.Types.ObjectId,
  orgId:Schema.Types.ObjectId,
  mails:[{type:Schema.Types.ObjectId,ref:'nudgeMail'}],
  createdAt:Date
});
var NudgeMailboxCollection=mongoose.model('nudgeMailbox',NudgeMailboxSchema);
module.exports=NudgeMailboxCollection;
