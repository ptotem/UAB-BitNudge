var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var goalMasterSchema=new Schema({
    name:String,
<<<<<<< HEAD
    noOfTransactions:Number,
    tags:[{type:Schema.Types.ObjectId,ref:'tags'}],
    transactions:[{type:Schema.Types.ObjectId,ref:'transactionMasters'}],
=======
    criteria:String,
    noOfSubgoals:Number,
    subgoals:[{type:Schema.Types.ObjectId,ref:'goalMasters'}],
    action:{
      targetParam:String,
      allowedTransactions:[{type:Schema.Types.ObjectId,ref:'transactionMasters'}],
      targetValue:Number,
    },
    // tags:[{type:Schema.Types.ObjectId,ref:'tags'}],
    // transactions:[{type:Schema.Types.ObjectId,ref:'transactionMasters'}],
>>>>>>> eaf3c3277e793f12e4116680da3ebe50ed3c788b
    orgId:{type:Schema.Types.ObjectId,ref:'organizations'},
    createdAt :Date
});
var goalMaster=mongoose.model('goalMasters',goalMasterSchema);
module.exports=goalMaster;
