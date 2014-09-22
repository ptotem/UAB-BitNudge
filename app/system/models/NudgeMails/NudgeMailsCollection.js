var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var nudgeMailsSchema=new Schema({
    subject:String,
    content:String,
    sender:String,//{type:Schema.Types.ObjectId,ref:'user'},
    receivers:String,//[{type:Schema.Types.ObjectId,ref:'user'}],
    timestamp:String,
    organizationId:String,//{type:Schema.Types.ObjectId,ref:'organization'},
    read :String,
    createdAt:Date
});
var nudgeMail=mongoose.model('nudgeMail',nudgeMailsSchema);
module.exports=nudgeMail;

//{subject,content,sender,receivers,timestamp,read}

