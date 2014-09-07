var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var messageTypesSchema=new Schema({
  name:String,
  points:Number,
  organizationId:Schema.Types.ObjectId,
});
var messageTypes=mongoose.model('messageTypes',messageTypesSchema);
module.exports=messageTypes;
