var mongoose=require('mongoose');
var Schema=mongoose.Schema;
// var SALT_WORK_FACTOR=10;
var challengesSchema=new Schema({
  orgId:{type:Schema.Types.ObjectId,ref:'organizations'},
  challenges:[{
    creator:{type:Schema.Types.ObjectId,ref:'users'},
    criteria:String,
    startDate:Date,
    approved:Boolean,
    scope:String,                   //Scope can be organization wide, team wide, or single player
    entity:Schema.Types.ObjectId,   //This can hold either the orgId,teamId or playerId based on the scope.
    endDate:Date,
    createdAt:Date,
    pointsFn:String,
    subgoals:[{
      subgoal:{type:Schema.Types.ObjectId,rel:'goalMasters'},
      targetValue:Number
    }],
    action:{
      allowedTransactions:[{type:Schema.Types.ObjectId,ref:'transactionMasters'}],
      targetValue:Number
    }
  }],
  createdAt:Date
});
var Challenges=mongoose.model('challenges',challengesSchema);
module.exports=Challenges;
