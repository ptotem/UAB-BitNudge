var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var TransactionsSchema=new Schema({
  transactionMaster:{type:Schema.Types.ObjectId,ref:'transactionMasters'},
  tags:[{name:String,value:String}],
  target:Number,
  userId:Schema.Types.ObjectId,
  moderated:Boolean,
  moderator:{type:Schema.Types.ObjectId,ref:'users'},
  orgId:Schema.Types.ObjectId,
  createdAt:Date
});
var TransactionsCollection=mongoose.model('transactions',TransactionsSchema);
module.exports=TransactionsCollection;
