var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var TransactionMasterSchema=new Schema({
    name:String,
    format:String,
    noOfParams:Number,
    pointsFn:String,  //function that will be called to get points
    onApproved:String,  //function that will be called after approval
    orgId:{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt:Date
});
var TransactionMasterCollection=mongoose.model('transactionMaster',TransactionMasterSchema);
module.exports=TransactionMasterCollection;
