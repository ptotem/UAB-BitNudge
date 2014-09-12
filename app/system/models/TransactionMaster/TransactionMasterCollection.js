var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var TransactionMasterSchema=new Schema({
  name:String,
  format:String,
  noOfParams:Number,
  pointsFn:String,  //function that will be called to get points
  onApproved:String,  //function that will be called after approval
  createdAt:Date
});
var TransactionMasterCollection=mongoose.model('transactionMaster',transactionSchema);
module.exports=TransactionMasterCollection;