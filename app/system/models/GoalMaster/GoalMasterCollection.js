var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var goalMasterSchema=new Schema({
    name:String,
    noOfTransactions:Number,
    transactions:[{type:Schema.Types.ObjectId,ref:'transactionMasters'}],
    orgId:{type:Schema.Types.ObjectId,ref:'organizations'},
    createdAt :Date
});
var goalMaster=mongoose.model('goalMasters',goalMasterSchema);
module.exports=goalMaster;
