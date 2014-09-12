var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var NudgeChatSchema=new Schema({
  userId:Schema.Types.ObjectId,
  orgId:Schema.Types.ObjectId
  messages:[{
    content:String,
    userId:{type:Schema.Types.ObjectId,ref:'users'},
    timestamp:Date
  }],
  createdAt:Date
});
var NudgeChatCollection=mongoose.model('nudgeChat',NudgeChatSchema);
module.exports=NudgeChatCollection;
