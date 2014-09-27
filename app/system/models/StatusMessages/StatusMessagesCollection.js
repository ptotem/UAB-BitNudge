var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var statusMessageSchema=new Schema({
    content: String,
    userId: {type:Schema.Types.ObjectId,ref:'users'},
    type:String,
    parentId: {type:Schema.Types.ObjectId,ref:'users'},
    orgId : {type:Schema.Types.ObjectId,ref:'organization'},
    messages : [{type:Schema.Types.ObjectId,ref:'statusMessages'}],
    likes : String,
    createdAt :Date
});
var StatusMessage=mongoose.model('statusMessages',statusMessageSchema);
module.exports=StatusMessage;
