var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var storeSchema=new Schema({
    _id:String,
  name:String,
  // Url:String,
  organizationId:String,//Schema.Types.ObjectId,
  items:String,//[{type:Schema.Types.ObjectId,ref:'storeItems'}],
  storeDesc:String,
  createdAt:Date
});
var stores=mongoose.model('store',storeSchema);
module.exports=stores;
