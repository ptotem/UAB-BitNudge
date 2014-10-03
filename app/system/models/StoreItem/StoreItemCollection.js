var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var storeItemSchema=new Schema({
  name:String,
  quantity:Number,
  cost:Number,
  desc:String,
  orgId:{type:Schema.Types.ObjectId,ref:'organizations'},
  createdAt:Date
});
var storeItems=mongoose.model('storeItems',storeItemSchema);
module.exports=storeItems;
