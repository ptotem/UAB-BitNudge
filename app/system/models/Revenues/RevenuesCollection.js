var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var revenueSchema=new Schema({
    name:String,
    product:{type:Schema.Types.ObjectId,ref:'products'},
    client:{type:Schema.Types.ObjectId,ref:'clientType'},
    user:{type:Schema.Types.ObjectId,ref:'user'},
    orgId:{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt:Date
});
var revenue=mongoose.model('revenues',revenueSchema);
module.exports=revenue;

