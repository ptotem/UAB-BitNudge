var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var capabilitySchema=new Schema({
  name:String,
  orgId:{type:Schema.Types.ObjectId,ref:'organizations'}
});
var capability=mongoose.model('orgTags',capabilitySchema);
module.exports=capability;
