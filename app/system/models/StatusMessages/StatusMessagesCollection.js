var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema=mongoose.Schema;

var statusMessageSchema=new Schema({
    content: String,
    userId: {type:Schema.Types.ObjectId,ref:'user'},
    parentId: {type:Schema.Types.ObjectId,ref:'user'},
    org_Id : {type:Schema.Types.ObjectId,ref:'organization'},
    messages : [{type:String}],
    likes : String,
    createdAt :Date
});
var StatusMessage=mongoose.model('status_messages',statusMessageSchema);
module.exports=StatusMessage;
