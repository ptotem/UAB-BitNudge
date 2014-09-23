var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var TransactionsSchema=new Schema({
  transactionSchema:{type:Schema.Types.ObjectId,ref:'transactionMaster'},
  params:[{name:String,value:String}],
  userId:Schema.Types.ObjectId,
  moderated:Boolean,
  moderator:{type:Schema.Types.ObjectId,ref:'users'},
  orgId:Schema.Types.ObjectId,
  createdAt:Date
});
var TransactionsCollection=mongoose.model('transactions',TransactionsSchema);
module.exports=TransactionsCollection;