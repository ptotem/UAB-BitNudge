var TransactionModel=require('../models/Transactions');
var TransactionMasterModel=require('../models/TransactionMaster');
var UsersModel=require('../models/Users');
var UserPointsModel=require('../models/UserPoints');
var EventsController=require('./EventsController.js');

var TransactionController={
  createTransaction:function(req,res){
    TransactionModel.createTransaction(req.params.orgId,req.params.userId,req.body,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  getTransaction:function(req,res){
    TransactionModel.getTransaction(transId,function(err,obj){
      if(err) handleError(err);
      res.send(obj);
    });
  },
  getTransactionsOfUser:function(req,res){
    TransactionModel.getTransactionsOfUser(req.params.userId,function(err,obj){
      if(err) return handleError(err);
      else res.send(obj);
    });
  },
  approveTransaction:function(req,res){
    TransactionModel.approveTransaction(req.params.transactionId,req.params.userId,function(err,obj){
      TransactionModel.getTransaction(req.params.transactionId,"","","",function(err1,transObj){
        TransactionMasterModel.getTransactionMaster(transObj.transactionMaster,"","","",function(err2,points){
          // eval("var pointsFunction=("+points.pointsFn+");");
          // var pointsEarned=pointsFunction(1);
          // UserPointsModel.addPointsEverywhere(req.params.userId,new Date(),{pointsEarned:pointsEarned,type:"transactions",from:transObj._id},function(){});
          // TeamPointsModel.addPointsEverywhere(req.params.userId,new Date(),{pointsEarned:pointsEarned,type:"transactions",from:transObj._id},function(){});
          // UsersModel.incrementUserCashAndPointsBy(obj.userId,pointsEarned,function(){});
          EventsController.processTransactionForUser(req.params.userId,transObj,function(err,obj){
            // if(err) res.send("fail");
            // else res.send("success");
            // UserModel.populate(goals,g)
            res.send(obj);
          });
          // res.send({points:pointsEarned});
        });
      });
      // if(err) res.send(err);
      // res.send(obj);
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
