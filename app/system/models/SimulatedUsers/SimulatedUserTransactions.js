var SimulatedUsersCollection=require('./SimulatedUsersCollection.js');
var mongoose=require('mongoose');
var Transactions={
  addTransaction:function(userId,transactionData,callback){
    if(!transactionData.date)
      transactionData.date=new Date();
      SimulatedUsersCollection.update({_id:userId},{$push:{transactions:transactionData}},callback);
  },
  getTransaction:function(userId,transactionId,fields,options,populationData,callback){
    SimulatedUsersCollection.findOne({userId:userId,'transactions._id':transactionId},{'transactions.$':1},options).populate(populationData).exec(callback);
  },
  getTransactionsOfSimulatedUser:function(userId,fields,options,populationData,callback){
      fields+=" transactions";
      if(options.slice.limits)
      {
          SimulatedUsersCollection.findOne({'_id': userId},fields,{ transactions:{ $slice:[parseInt(options.slice.offset),parseInt(options.slice.limits)] } }).populate(populationData).exec(callback);
      }

      else{
          SimulatedUsersCollection.findOne({'_id':userId},fields).populate(populationData).exec(callback);
      }
//    if(fields)
//      fields+=" transactions";
////    SimulatedUsersCollection.find({userId:userId},fields,options).populate(populationData).exec(callback);
//      if(options)
//       SimulatedUsersCollection.findOne( {'_id':userId},{ transactions:{ $slice: [ parseInt(offset),parseInt(limit) ] } },fields,options).populate(populationData).exec(callback);
//      else
//      {
//          SimulatedUsersCollection.find({'_id':userId},fields,options).populate(populationData).exec(callback);
//
//      }
  },
  approveTransaction:function(userId,transactionId,approver,callback){
    SimulatedUsersCollection.update({userId:userId,'transaction._id':transactionId},{$set:{'transactions.$.approved':true}},callback);
  },
  deleteTransaction:function(userId,transactionId,callback){
      SimulatedUsersCollection.update({_id:userId},{$pull:{transactions:{_id:transactionId}}},callback);
  }
  // updateTransaction:function(userId,transactionData,updateData,callback){
  //   SimulatedUsersCollection.update({_id:userId},{$set:updateData},callback);
  // }
};
module.exports=Transactions;
