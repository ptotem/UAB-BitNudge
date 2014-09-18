var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var roleSchema=new Schema({
    name:String,
    action:[{type:Schema.Types.ObjectId,ref:'action'}],
    orgId :{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt:Date
});
var Role=mongoose.model('role',roleSchema);
module.exports=Role;
