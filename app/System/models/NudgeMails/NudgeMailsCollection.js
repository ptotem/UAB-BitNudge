var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var nudgeMailsSchema=new Schema({
    subject:String,
    content:String,
    sender:{type:Schema.Types.ObjectId,ref:'user'},
    receivers:[{type:Schema.Types.ObjectId,ref:'user'}],
    timestamp:String,
    organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
    read :String,
    created_at:Date
});
var nudgeMail=mongoose.model('nudgeMail',nudgeMailsSchema);
module.exports=nudgeMail;

//{subject,content,sender,receivers,timestamp,read}

