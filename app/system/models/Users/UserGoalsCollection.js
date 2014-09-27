var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var goalsSchema=new Schema({
  userId:Schema.Types.ObjectId,
  goalId:{type:Schema.Types.ObjectId,ref:'goals'},
  moderated:Boolean,
  stepsDone:[{
    stepNo:Number,
    done:Boolean
  }],
  createdAt:Date
});
var goals=mongoose.model('userGoals',goalsSchema);
module.exports=goals;
