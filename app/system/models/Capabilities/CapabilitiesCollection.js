var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var capabilitySchema=new Schema({
  name:String,
  isAuthorized:String
});
var capability=mongoose.model('capabilities',capabilitySchema);
module.exports=capability;
