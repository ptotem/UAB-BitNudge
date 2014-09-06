var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var storeItemSchema=new Schema({
  name:String,
  url:String,
  quantity:Number,
  desc:String,
  pic:Schema.Types.Buffer,
  storeId:Schema.Types.ObjectId,
});
var storeItems=mongoose.model('storeItem',storeItemSchema);
module.exports=storeItems;
