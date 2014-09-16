var TransactionModel=require('../models/Transactions');
var TransactionMasterModel=require('../models/TransactionMaster');
var UsersModel=require('../models/Users');
var UserPointsModel=require('../models/UserPoints');
var EventsController=require('./EventsController.js');

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
    TransactionModel.approveTransaction(id,function(err,obj){
      TransactionModel.getTransaction(id,function(err,transObj){
        TransactionMasterModel.getPoints(obj.transactionSchema,obj.params,function(err,points){
          UserPointsModel.UserMonthPoints.addPointsObject(obj.userId,new Date(),{pointsEarned:points,type:"transaction",from:transObj._id},function(){});
          UserPointsModel.UserQuarterPoints.addPoints(obj.userId,new Date(),points,function(){});
          UserPointsModel.UserYearPoints.addPoints(obj.userId,new Date(),points,function(){});
          UsersModel.incrementUserCashAndPointsBy(obj.userId,points,function(){});
          EventsController.onApproved(transObj._id);
        });
      });
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
