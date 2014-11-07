var mongoose=require('mongoose');
var Schema=mongoose.Schema;
//only goals of criteria "Action" are stored here. Only those types of goals are reusable.
var goalMasterSchema=new Schema({
    name:String,
    // criteria:String,     //criteria is always "Action"
    // noOfSubgoals:Number,
    // subgoals:[{type:Schema.Types.ObjectId,ref:'goalMasters'}],
    action:{
      targetParam:String,
      allowedTransactions:[{type:Schema.Types.ObjectId,ref:'transactionMasters'}],
      // this one is just a default targetValue. The real value is stored in the user collection along with the instance of the goal
      targetValue:Number,
    },
    // tags:[{type:Schema.Types.ObjectId,ref:'tags'}],
    // transactions:[{type:Schema.Types.ObjectId,ref:'transactionMasters'}],
    creator:{type:Schema.Types.ObjectId,ref:'users'},
    orgId:{type:Schema.Types.ObjectId,ref:'organizations'},
    createdAt :Date
});
var goalMaster=mongoose.model('goalMasters',goalMasterSchema);
module.exports=goalMaster;
