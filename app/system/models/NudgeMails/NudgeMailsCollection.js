var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var nudgeMailsSchema=new Schema({
  subject:String,
  content:String,
  sender:{type:Schema.Types.ObjectId,ref:'users'},
  receivers:[{type:Schema.Types.ObjectId,ref:'users'}],
  timestamp:String,
  orgId:{type:Schema.Types.ObjectId,ref:'organizations'},
  read :String,
  createdAt:Date
});
var nudgeMail=mongoose.model('nudgeMail',nudgeMailsSchema);
module.exports=nudgeMail;
