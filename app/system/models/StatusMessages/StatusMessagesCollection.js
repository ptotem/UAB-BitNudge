var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var statusMessageSchema=new Schema({
    content: String,
    userId: {type:Schema.Types.ObjectId,ref:'user'},
    parentId: {type:Schema.Types.ObjectId,ref:'user'},
    orgId : {type:Schema.Types.ObjectId,ref:'organization'},
    messages : String,
    likes : String,
    created_at :Date
});
var StatusMessage=mongoose.model('status_messages',statusMessageSchema);
module.exports=StatusMessage;
