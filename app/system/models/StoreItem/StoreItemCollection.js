var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var storeItemSchema=new Schema({
  name:String,
  quantity:Number,
  cost:Number,
  desc:String,
  orgId:Schema.Types.ObjectId,
  createdAt:Date
});
var storeItems=mongoose.model('storeItem',storeItemSchema);
module.exports=storeItems;
