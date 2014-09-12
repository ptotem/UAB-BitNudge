var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/uab');
var Schema=mongoose.Schema;

var organizationSchema=new Schema({
    name:String,
    location:String,
    revenue :[{type:Schema.Types.ObjectId,ref:'revenues'}],
    createdAt:Date
});
var Organization=mongoose.model('organization',organizationSchema);
module.exports=Organization;
//organizationId:{type:Schema.Types.ObjectId,ref:'organization'},