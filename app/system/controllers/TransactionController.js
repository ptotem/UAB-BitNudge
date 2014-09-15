var TransactionModel=require('../models/Transactions');

var TransactionController={
  createTransaction:function(req,res){
    TransactionModel.createTransaction(orgId,data);
  },
  getTransaction:function(req,res){
    TransactionModel.getTransaction(transId,function(err,obj){
      if(err) handleError(err);
      res.send(obj);
    });
  },
  getTransactionsOfUser:function(req,res){
    TransactionModel.getTransactionsOfUser(userId,function(err,obj){
      if(err) return handleError(err);
      else res.send(obj);
    });
  },
  approveTransaction:function(req,res){
    TransactionModel.approveTransaction(id,userId,function(err,obj){
      res.send(obj);
    });
  },
  deleteTransaction:function(req,res){
    TransactionModel.deleteTransaction(id,function(err,obj){
      if(err) handleError(err);
      res.send(obj);
    });
  },
  updateTransaction:function(id,fieldName,value,callback){
    TransactionModel.updateTransaction(id,updatedData,function(err,obj){
      if(err) handleError(err);
      res.send(obj);
    });
  }
};
module.exports=TransactionController;
