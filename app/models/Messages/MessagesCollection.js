var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var messagesSchema=new Schema({
  userId:Schema.Types.ObjectId,
  content:String,
  messages:[Schema.Types.ObjectId],
  likes:[Schema.Types.ObjectId],
  messageType:Schema.Types.ObjectId,
  entity:{entityId:Schema.Types.ObjectId,entityType:Schema.Types.ObjectId},
  moderated:String,
  organizationId:Schema.Types.ObjectId,
});
var messages=mongoose.model('messages',messagesSchema);
module.exports=messages;
