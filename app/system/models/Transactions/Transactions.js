var TransactionsCollection=require('./TransactionsCollection.js');

var Transactions={
  createTransaction:function(organizationId,data){
    data.createdAt=new Date();
    data.orgId=organizationId;
    var l=new TransactionsCollection(data);
    l.save();
    return true;
  },
  getTransaction:function(id,fields,options,populationData,callback){
    TransactionsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getTransactionsOfUser:function(userId,callback){
    TransactionsCollection.find({userId:userId},fields,options).populate(populationData).exec(callback);
  },
  getTransactionSchema:function(){
    return TransactionsCollection.Schema;
  },
  approveTransaction:function(id,approver,callback){
    TransactionsCollection.findOne({_id:id},function(err,obj){
      if(err) return callback(err,null);
      if(obj.moderator==id)
        TransactionsCollection.update({_id:id},{$set:{moderated:true}},callback);
      else return callback(err,null);    
    });
  },
  deleteTransaction:function(id,callback){
    TransactionsCollection.remove({_id:id},callback);
  },
  updateTransaction:function(id,updateDate,callback){
    TransactionsCollection.update({_id:id},{$set:updateData},callback);
  },
  validateRanges:function(rangeMin,rangeMax){
    //put some validation effects. The ranges must not intersect.
    return true;
  }
};
module.export=Transactions;
