var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema=mongoose.Schema;

var roleSchema=new Schema({
    name:String,
    action:String,//[{type:Schema.Types.ObjectId,ref:'action'}],
    org_Id :String,//{type:Schema.Types.ObjectId,ref:'organization'}
});
var Role=mongoose.model('role',roleSchema);
module.exports=Role;
