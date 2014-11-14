var UserModel=require('../models/Users');
var tempModel=require('../models/SimulatedUsers');
var SimulatedUserModel=tempModel.Users;
var SimulatedTransactionModel=tempModel.Transactions;
var async=require('async');
var SimulationController={
  startSimulationOfUser:function(req,res){
    UserModel.cloneUser(req.params.userId,function(err,clonedUser){
      if(err) res.send(err);
      else SimulatedUserModel.createSimulationOfUser(req.params.userId,clonedUser,function(err,result){
        if(err) res.send(err);
        else res.send(result);
      });
    });
  },
  addTransactionToSimulation:function(req,res){
    SimulatedTransactionModel.addTransaction(req.params.userId,req.body,function(err,obj){
      if(err)res.send(err);
      else res.send("success");
    });
  }
};
module.exports=SimulationController;
