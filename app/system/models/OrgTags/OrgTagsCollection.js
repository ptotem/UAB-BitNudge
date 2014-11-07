var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var capabilitySchema=new Schema({
  name:String,
});
var capability=mongoose.model('orgTags',capabilitySchema);
module.exports=capability;
