var TransactionsCollection=require('./TransactionsCollection.js');
var mongoose=require('mongoose');
var Transactions={
  createTransaction:function(orgId,userId,data,callback){
    data.createdAt=new Date();
    data.userId=mongoose.Types.ObjectId(userId);
    data.orgId=mongoose.Types.ObjectId(orgId);
    var l=new TransactionsCollection(data);
    l.save(callback);
  },
  getTransaction:function(id,fields,options,populationData,callback){
    TransactionsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getTransactionsOfUser:function(userId,fields,options,populationData,callback){
    TransactionsCollection.find({userId:userId},fields,options).populate(populationData).exec(callback);
  },
  getTransactionSchema:function(){
    return TransactionsCollection.Schema;
  },
  approveTransaction:function(id,approver,callback){
    TransactionsCollection.findOne({_id:id},function(err,obj){
      if(err) return callback(err,null);
      // if(obj.moderator==id)
        // TransactionsCollection.update({_id:id},{$set:{moderated:true}},callback);
      else return callback(err,obj);    
    });
  },
  deleteTransaction:function(id,callback){
    TransactionsCollection.remove({_id:id},callback);
  },
  updateTransaction:function(id,updateDate,callback){
    TransactionsCollection.update({_id:id},{$set:updateData},callback);
  }
};
module.exports=Transactions;
