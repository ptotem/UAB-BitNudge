var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var capabilitySchema=new Schema({
  name:String,
  method:String
});
var capability=mongoose.model('abilities',capabilitySchema);
module.exports=capability;
