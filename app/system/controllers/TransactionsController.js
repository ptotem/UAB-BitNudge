var TransactionMasterModel=require('../models/TransactionMaster');
var tempModel=require('../models/Users');
var UserModel=tempModel.Users;
var TransactionModel=tempModel.Transactions;
var UserPointsModel=require('../models/UserPeriodPoints');
var TeamPointsModel=require('../models/TeamPeriodPoints');
var EventsController=require('./EventsController.js');

var TransactionController={
  createTransaction:function(req,res){
    if(!req.body.date)
      req.body.date=new Date();
    TransactionModel.addTransaction(req.params.userId,req.body,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  getTransaction:function(req,res){
    TransactionModel.getTransaction(req.params.userId,req.params.transId,"","","",function(err,obj){
      if(err) handleError(err);
      res.send(obj);
    });
  },
  getTransactionsOfUser:function(req,res){
    TransactionModel.getTransactionsOfUser(req.params.userId,"",req.query.limits,"",req.query.limits,req.query.offset,function(err,obj){
      if(err) return handleError(err);
      else res.send(obj);
    });
  },
  approveTransaction:function(req,res){
    TransactionModel.approveTransaction(req.params.userId,req.params.transactionId,null,function(err,obj){
      TransactionModel.getTransaction(req.params.transactionId,"","","",function(err1,transObj){
        TransactionMasterModel.getTransactionMaster(transObj.transactionMaster,"","","",function(err2,points){
          eval("var pointsFunction=("+points.pointsFn+");");
          var pointsEarned=pointsFunction(transObj.target);
          UserModel.addPointsObject(req.params.userId,{pointsEarned:pointsEarned,type:"transactions",from:transObj._id},function(){});
          UserPointsModel.addPointsEverywhere(req.params.userId,new Date(),pointsEarned,function(){});
          UserModel.getUser(userId,"teams","","",function(err,user){
            user.teams.forEach(function(teamId){
              TeamPointsModel.addPointsEverywhere(teamId,new Date(),pointsEarned,function(){});
            });
          });
          UserModel.incrementUserCashAndPointsBy(obj.userId,pointsEarned,function(){});
          EventsController.processTransactionForUser(req.params.userId,transObj,function(err,obj){
            if(err) res.send("fail");
            else res.send("success");
          });
        });
      });
    });
  },
  deleteTransaction:function(req,res){
    TransactionModel.deleteTransaction(req.params.userId,req.params.transactionId,function(err,obj){
      if(err) handleError(err);
      res.send(obj);
    });
  }
  // updateTransaction:function(id,fieldName,value,callback){
  //   TransactionModel.updateTransaction(id,updatedData,function(err,obj){
  //     if(err) handleError(err);
  //     res.send(obj);
  //   });
  // }
};
module.exports=TransactionController;
