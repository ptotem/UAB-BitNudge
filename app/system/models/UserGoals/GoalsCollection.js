var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var goalsSchema=new Schema({
  userId:Schema.Types.ObjectId,
  goals:[{
    goalId:Schema.Types.ObjectId,
    moderated:Boolean,
    addedAt:Date,
    stepsDone:[{
      stepNo:Number,
      done:Boolean
    }],
    createdAt:Date
  }] 
  // creator:Schema.Types.ObjectId,
  // name:String,
  // players:[Schema.Types.ObjectId],
  // steps:[{transactionSchema:Schema.Types.ObjectId,quantity:Number,done:Boolean}],
  // points:Number,
  // medals:[{type:Schema.Types.ObjectId,ref:'medals'}],
  // startDate:Date,
  // endDate:Date,
  // organizationId:Schema.Types.ObjectId,
});
var goals=mongoose.model('userGoals',goalsSchema);
module.exports=goals;
