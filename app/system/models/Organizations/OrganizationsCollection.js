var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var organizationSchema=new Schema({
    name:String,
    location:String,
    revenue :[{type:Schema.Types.ObjectId,ref:'revenues'}],
    createdAt:Date
});
var Organization=mongoose.model('organizations',organizationSchema);
module.exports=Organization;
//organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
