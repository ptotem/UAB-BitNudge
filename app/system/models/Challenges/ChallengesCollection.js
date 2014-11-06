var mongoose=require('mongoose');
var Schema=mongoose.Schema;
// var SALT_WORK_FACTOR=10;
var challengesSchema=new Schema({
  orgId:{type:Schema.Types.ObjectId,ref:'organizations'},
  goals:[{
    // goalMaster:{type:Schema.Types.ObjectId,ref:'goalMasters'},
    // tags:[{type:Schema.Types.ObjectId,ref:'tags'}],
    creator:{type:Schema.Types.ObjectId,ref:'users'},
    criteria:String,
    startDate:Date,
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
  createdAt:Date,
});
var Challenges=mongoose.model('challenges',challengesSchema);
module.exports=Challenges;
