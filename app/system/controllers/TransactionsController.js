var TransactionMasterModel=require('../models/TransactionMaster');
var tempModel=require('../models/Users');
var UserModel=tempModel.Users;
var TransactionModel=tempModel.Transactions;
var UserPointsModel=require('../models/UserPeriodPoints');
var TeamPointsModel=require('../models/TeamPeriodPoints');
var EventsController=require('./EventsController.js');
var TransactionMasterModel=require('../models/TransactionMaster');

//The architecture of transactions has changed. Now the admin enters transactions, and they are pre-approved.
var TransactionController={
  createTransaction:function(req,res){
<<<<<<< HEAD
    if(!req.body.date)
      req.body.date=new Date();
=======
    // if(!req.body.date)
    req.body.date=new Date();
>>>>>>> eaf3c3277e793f12e4116680da3ebe50ed3c788b
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
//      TeamModel.getStoresOfTeam(req.params.teamId,"stores",  {  slice: {  limits: parseInt(req.query.limits), offset: parseInt(req.query.offset) }
//          } ,"stores",function(err,obj){
    TransactionModel.getTransactionsOfUser(req.params.userId,"",{  slice: {  limits: parseInt(req.query.limits), offset: parseInt(req.query.offset) }},"",function(err,obj){
      if(err) return handleError(err);
      else res.send(obj);
    });
  },
<<<<<<< HEAD
  // approveTransaction:function(req,res){
  //   TransactionModel.approveTransaction(req.params.userId,req.params.transactionId,null,function(err,obj){
  //     TransactionModel.getTransaction(req.params.transactionId,"","","",function(err1,transObj){
  //       TransactionMasterModel.getTransactionMaster(transObj.transactionMaster,"","","",function(err2,points){
  //         eval("var pointsFunction=("+points.pointsFn+");");
  //         var pointsEarned=pointsFunction(transObj.target);
  //         UserModel.addPointsObject(req.params.userId,{pointsEarned:pointsEarned,type:"transactions",from:transObj._id},function(){});
  //         UserPointsModel.addPointsEverywhere(req.params.userId,new Date(),pointsEarned,function(){});
  //         UserModel.getUser(userId,"teams","","",function(err,user){
  //           user.teams.forEach(function(teamId){
  //             TeamPointsModel.addPointsEverywhere(teamId,new Date(),pointsEarned,function(){});
  //           });
  //         });
  //         UserModel.incrementUserCashAndPointsBy(obj.userId,pointsEarned,function(){});
  //         EventsController.processTransactionForUser(req.params.userId,transObj,function(err,obj){
  //           if(err) res.send("fail");
  //           else res.send("success");
  //         });
  //       });
  //     });
  //   });
  // },
  approveTransaction:function(req,res){
    if(!req.body.date)
      req.body.date=new Date();
    TransactionModel.addTransaction(req.params.userId,req.body,function(err,transaction){
      if(err) return res.send(err);
      TransactionModel.approveTransaction(req.params.userId,transaction._id,null,function(err,obj){
        // TransactionModel.getTransaction(transaction._id,"","","",function(err1,transObj){
          transObj=transaction;
          TransactionMasterModel.getTransactionMaster(transObj.transactionMaster,"","","",function(err2,points){
            eval("var pointsFunction=("+points.pointsFn+");");
            var pointsEarned=pointsFunction(transObj.target);
            EventsController.triggerUserPointsAddition(req.params.userId,pointsEarned,"transactions",transObj._id,function(){});
            // UserModel.addPointsObject(req.params.userId,{pointsEarned:pointsEarned,type:"transactions",from:transObj._id},function(){});
            // UserPointsModel.addPointsEverywhere(req.params.userId,new Date(),pointsEarned,function(){});
            // UserModel.getUser(userId,"teams","","",function(err,user){
            //   user.teams.forEach(function(teamId){
            //     TeamPointsModel.addPointsEverywhere(teamId,new Date(),pointsEarned,function(){});
            //   });
            // });
            EventsController.processTransactionForUser(req.params.userId,transObj,function(err,obj){
              if(err) res.send("fail");
              else res.send("success");
            });
          });
        // });
      });
    });
  },
=======
  approveTransaction:function(req,res){
    TransactionModel.approveTransaction(req.params.userId,req.params.transactionId,null,function(err,obj){
      TransactionModel.getTransaction(req.params.transactionId,"","","",function(err1,transObj){
        TransactionMasterModel.getTransactionMaster(transObj.transactionMaster,"","","",function(err2,points){
          eval("var pointsFunction=("+points.pointsFn+");");
          var pointsEarned=pointsFunction(transObj.target);
          EventsController.triggerUserPointsAddition(req.params.userId,pointsEarned,"transactions",transObj._id,function(){});
          EventsController.processTransactionForUser(req.params.userId,transObj,function(err,obj){
            if(err) res.send("fail");
            else res.send("success");
          });
        });
      });
    });
  },
  // approveTransaction:function(req,res){
  //   if(!req.body.date)
  //     req.body.date=new Date();
  //   TransactionModel.addTransaction(req.params.userId,req.body,function(err,transaction){
  //     if(err) return res.send(err);
  //     TransactionModel.approveTransaction(req.params.userId,transaction._id,null,function(err,obj){
  //       // TransactionModel.getTransaction(transaction._id,"","","",function(err1,transObj){
  //         transObj=transaction;
  //         TransactionMasterModel.getTransactionMaster(transObj.transactionMaster,"","","",function(err2,points){
  //           eval("var pointsFunction=("+points.pointsFn+");");
  //           var pointsEarned=pointsFunction(transObj.target);
  //           EventsController.triggerUserPointsAddition(req.params.userId,pointsEarned,"transactions",transObj._id,function(){});
  //           EventsController.processTransactionForUser(req.params.userId,transObj,function(err,obj){
  //             if(err) res.send("fail");
  //             else res.send("success");
  //           });
  //         });
  //       // });
  //     });
  //   });
  // },
>>>>>>> eaf3c3277e793f12e4116680da3ebe50ed3c788b
  deleteTransaction:function(req,res){
    TransactionModel.deleteTransaction(req.params.userId,req.params.transactionId,function(err,obj){
      if(err) handleError(err);
      res.send(obj);
    });
  },
  getAllTransactionMasters:function(req,res){
    TransactionMasterModel.getAllTransactionMasters("","","",function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
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
