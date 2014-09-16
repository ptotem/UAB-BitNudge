var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var storeItemSchema=new Schema({
  name:String,
  quantity:Number,
  cost:Number,
  desc:String,
  organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
  createdAt:Date
});
var storeItems=mongoose.model('storeItem',storeItemSchema);
module.exports=storeItems;
