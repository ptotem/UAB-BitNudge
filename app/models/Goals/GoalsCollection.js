var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var goalsSchema=new Schema({
  creator:Schema.Types.ObjectId,
  name:String,
  goalType:Schema.Types.ObjectId,
  players:[Schema.Types.ObjectId],
  length:Number,
  lengthCompleted:Number,
  transactionType:Schema.Types.ObjectId,
  points:Number,
  medals:[Schema.Types.ObjectId],
  startDate:Date,
  endDate:Date,
  extraData:String,  
  organizationId:Schema.Types.ObjectId,
});
var goals=mongoose.model('goals',goalsSchema);
module.exports=goals;
