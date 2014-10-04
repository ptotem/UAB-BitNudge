var UsersCollection=require('./UsersCollection.js');
var mongoose=require('mongoose');
var Transactions={
  addTransaction:function(userId,transactionData,callback){
    if(!transactionData.date)
      transactionData.date=new Date();
      UsersCollection.update({_id:userId},{$push:{transactions:transactionData}},callback);
  },
  getTransaction:function(userId,transactionId,fields,options,populationData,callback){
    UsersCollection.findOne({userId:userId,'transactions._id':transactionId},{'transactions.$':1},options).populate(populationData).exec(callback);
  },
  getTransactionsOfUser:function(userId,fields,options,populationData,limit,offset,callback){
    if(fields)
      fields+=" transactions";
//    UsersCollection.find({userId:userId},fields,options).populate(populationData).exec(callback);
      if(options)
       UsersCollection.findOne( {'_id':userId},{ transactions:{ $slice: [ parseInt(offset),parseInt(limit) ] } },fields,options).populate(populationData).exec(callback);
      else
      {
          UsersCollection.find({'_id':userId},fields,options).populate(populationData).exec(callback);

      }
  },
  getTransactionSchema:function(){
    return UsersCollection.Schema;
  },
  approveTransaction:function(userId,transactionId,approver,callback){
    UsersCollection.update({userId:userId,'transaction._id':transactionId},{$set:{'transactions.$.approved':true}},callback);
  },
  deleteTransaction:function(userId,transactionId,callback){
      UsersCollection.update({_id:userId},{$pull:{transactions:{_id:transactionId}}},callback);
  }
  // updateTransaction:function(userId,transactionData,updateData,callback){
  //   UsersCollection.update({_id:userId},{$set:updateData},callback);
  // }
};
module.exports=Transactions;
