var MessagesModel=require('../../models/Messages');
var MessageTypesModel=require('../../models/MessageTypes');
var UserModel=require('../../models/UserManagement');
var GoalEngine=require('../GoalEngine');
var TransactionEngineRoutes=require('./TransactionEngineRoutes');
var TransactionEngine={
  initialize:function(server){
    //initializaing routes
    for(property in TransactionEngineRoutes)
    {
      methods=property.split(" ");
      eval("server."+methods[0]+"('"+methods[1]+"',"+TransactionEngineRoutes[property]+');');
    }
    console.log("TransactionEngine initialized");
  },
  addAndProcessTransaction:function(organizationId,userId,transactionData,transactionType,callback){
    MessagesModel.createMessageOfUser(organizationId,userId,transactionType,transactionData,function(err,obj){
      MessageTypesModel.getMessageTypePoints(transactionType,function(points){
        if(err) return callback(null);
        UserModel.incrementUserCashAndPointsBy(userId,points,function(err,obj){
          callback(err,obj);
          GoalEngine.processTransaction(userId,obj,transactionType,function(err,obj){});
        });
      });
    });
  },
};
module.exports=TransactionEngine;
