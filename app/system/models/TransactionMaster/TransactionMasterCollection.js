var mongoose=require('mongoose');
var Schema=mongoose.Schema;
//var TransactionMasterSchema=new Schema({
//  name:String,
//  format:String,
//  noOfParams:Number,
//  pointsFn:String,  //function that will be called to get points
//  onApproved:String,  //function that will be called after approval
//  createdAt:Date
//});

var TransactionMasterSchema=new Schema({
    name:String,
    format:String,
    keyParam:String,
    paramCategory:String,
    pointType:String,
    orgId:{type:Schema.Types.ObjectId,ref:'organizations'},
    // tags:[{type:Schema.Types.ObjectId,ref:'tags'}],
    // noOfParams:Number,
    pointsFn:String, 
    createdAt:Date
});
var TransactionMasterCollection=mongoose.model('transactionMasters',TransactionMasterSchema);
module.exports=TransactionMasterCollection;

