var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var productSchema=new Schema({
    name:String,
    type:String,
    orgId:{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt:Date
});
var productTypes=mongoose.model('products',productSchema);
module.exports=productTypes;
