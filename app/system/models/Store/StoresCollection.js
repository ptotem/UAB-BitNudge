var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var storeSchema=new Schema({
    // _id:String,
  name:String,
  // Url:String,
  orgId:{type:Schema.Types.ObjectId,ref:'organizations'},
  items:[{type:Schema.Types.ObjectId,ref:'storeItems'}],
  description:String,
  createdAt:Date
});
var stores=mongoose.model('stores',storeSchema);
module.exports=stores;
