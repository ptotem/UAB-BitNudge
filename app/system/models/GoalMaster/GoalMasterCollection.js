var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var goalMasterSchema=new Schema({
    name:String,
    criteria:String,
    noOfSubgoals:Number,
    subgoals:[{type:Schema.Types.ObjectId,ref:'goalMasters'}],
    action:{
      targetParam:String,
      allowedTransactions:[{type:Schema.Types.ObjectId,ref:'transactionMasters'}],
      targetValue:Number,
    },
    // tags:[{type:Schema.Types.ObjectId,ref:'tags'}],
    transactions:[{type:Schema.Types.ObjectId,ref:'transactionMasters'}],
    orgId:{type:Schema.Types.ObjectId,ref:'organizations'},
    createdAt :Date
});
var goalMaster=mongoose.model('goalMasters',goalMasterSchema);
module.exports=goalMaster;
