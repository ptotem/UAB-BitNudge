var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var goalsSchema=new Schema({
  creator:Schema.Types.ObjectId,
  name:String,
  steps:[{stepNo:Number,transactionSchema:Schema.Types.ObjectId,quantity:Number}],
  totalSteps:Number,
  points:Number,
  medals:[{type:Schema.Types.ObjectId,ref:'medals'}],
  startDate:Date,
  endDate:Date,
  organizationId:Schema.Types.ObjectId,
  createdAt:Date
});
var goals=mongoose.model('goals',goalsSchema);
module.exports=goals;
