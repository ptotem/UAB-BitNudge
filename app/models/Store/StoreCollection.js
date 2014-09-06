var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var storeSchema=new Schema({
  name:String,
  Url:String,
  organizationId:Schema.Types.ObjectId,
  teamId:Schema.Types.ObjectId,
  items:[Schema.Types.ObjectId],
  storeDesc:String
});
var stores=mongoose.model('store',storeSchema);
module.exports=stores;
