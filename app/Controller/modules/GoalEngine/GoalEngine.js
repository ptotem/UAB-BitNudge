var MessagesModel=require('../../models/Messages');
var GoalEngineRoutes=require('./GoalEngineRoutes');
var GoalsModel=require('../../models/Goals');
var UserModel=require('../../models/UserManagement');
var property;
var GoalEngine={
  initialize:function(server){
    //initializaing routes
    for(property in GoalEngineRoutes)
    {
      methods=property.split(" ");
      eval("server."+methods[0]+"('"+methods[1]+"',"+GoalEngineRoutes[property]+');');
    }
    console.log("Users initialized");
  },
  processTransaction:function(userId,transactionObject,transactionType,callback){
    GoalsModel.findLiveGoalOfUserOfType(userId,transactionType,new Date(),function(err,goalObj){
      if(err) return callback(err,goalObj);
      else {
        GoalsModel.incrementCompletedCount(goalObj._id,function(err,obj){
          GoalsModel.getPointsToBeIncremented(goalObj._id,function(err,points){
            if(points>0)
              UserModel.incrementUserCashAndPointsBy(userId,points,callback);

          });
        });
      }
    });
  }

};
module.exports=GoalEngine;
