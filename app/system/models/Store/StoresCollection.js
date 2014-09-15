var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var storeSchema=new Schema({
  name:String,
  // Url:String,
  organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
  items:[{type:Schema.Types.ObjectId,ref:'storeItems'}],
  storeDesc:String,
  createdAt:Date
});
var stores=mongoose.model('store',storeSchema);
module.exports=stores;
