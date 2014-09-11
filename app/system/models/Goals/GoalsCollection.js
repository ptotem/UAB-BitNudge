var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var goalsSchema=new Schema({
  creator:Schema.Types.ObjectId,
  name:String,
  // players:[Schema.Types.ObjectId],
  steps:[{transactionSchema:Schema.Types.ObjectId,quantity:Number,done:Boolean}],
  points:Number,
  medals:[{type:Schema.Types.ObjectId,ref:'medals'}],
  startDate:Date,
  endDate:Date,
  organizationId:Schema.Types.ObjectId,
  createdAt:Date
});
var goals=mongoose.model('goals',goalsSchema);
module.exports=goals;
