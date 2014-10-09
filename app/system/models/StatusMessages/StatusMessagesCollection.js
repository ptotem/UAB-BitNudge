var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var statusMessageSchema=new Schema({
  content: String,
  userId: {type:Schema.Types.ObjectId,ref:'users'},
  type:String,
  // parentId: {type:Schema.Types.ObjectId,ref:'statusMessages'},
  orgId : {type:Schema.Types.ObjectId,ref:'organizations'},
  // messages : [{type:Schema.Types.ObjectId,ref:'statusMessages'}],
  messages : [{
    content:String,
    userId: {type:Schema.Types.ObjectId,ref:'users'},
    // type:String,         //not working for some reason.
    orgId : {type:Schema.Types.ObjectId,ref:'organizations'},
    likes : {type:Schema.Types.ObjectId,ref:'users'},
    totalLikes:Number,
    totalComments:Number,
    createdAt :Date
  }],
  likes : {type:Schema.Types.ObjectId,ref:'users'},
  totalLikes:Number,
  totalComments:Number,
  createdAt :Date
});
var StatusMessage=mongoose.model('statusMessages',statusMessageSchema);
module.exports=StatusMessage;
