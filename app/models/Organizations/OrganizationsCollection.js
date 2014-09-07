var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema=mongoose.Schema;

var organizationSchema=new Schema({
    name:String,
    location:String,
    account_type:String,
    stores :[Schema.Types.ObjectId]
});
var Organization=mongoose.model('organization',organizationSchema);
module.exports=Organization;
