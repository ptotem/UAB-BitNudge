var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var TransactionMasterSchema=new Schema({
    name:String,
    format:String,
    type:String,
    noOfParams:Number,
    pointsFn:String, //function that will be called to get points
    createdAt:Date
});
var TransactionMasterCollection=mongoose.model('transactionMasters',TransactionMasterSchema);
module.exports=TransactionMasterCollection;

