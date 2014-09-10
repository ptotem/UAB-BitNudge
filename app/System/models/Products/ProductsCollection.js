var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var productSchema=new Schema({
    name:String,
    type:String,
    organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
    created_at:Date
});
var productTypes=mongoose.model('products',productSchema);
module.exports=productTypes;
