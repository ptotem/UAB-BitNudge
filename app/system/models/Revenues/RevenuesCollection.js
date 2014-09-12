var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var revenueSchema=new Schema({
    product:{type:Schema.Types.ObjectId,ref:'products'},
    client:{type:Schema.Types.ObjectId,ref:'clientType'},
    user:{type:Schema.Types.ObjectId,ref:'user'},
    organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
    created_at:Date
});
var revenue=mongoose.model('revenues',revenueSchema);
module.exports=revenue;
