var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var NudgeMailboxSchema=new Schema({
    _id:String,
  userId:String,//Schema.Types.ObjectId,
  orgId:String,//Schema.Types.ObjectId,
  mails:String,//[{type:Schema.Types.ObjectId,ref:'nudgeMails'}],
  createdAt:Date
});
var NudgeMailboxCollection=mongoose.model('nudgeMailbox',NudgeMailboxSchema);
module.exports=NudgeMailboxCollection;
