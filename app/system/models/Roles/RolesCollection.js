var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema=mongoose.Schema;

var roleSchema=new Schema({
    name:String,
    action:[{type:Schema.Types.ObjectId,ref:'action'}],
    org_Id :{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt :Date
});
var Role=mongoose.model('role',roleSchema);
module.exports=Role;
