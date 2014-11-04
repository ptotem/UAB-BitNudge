var EventsCollection=require('./EventsCollection.js');
var Events={
  createEvents:function(orgId,userId,callback){
    var data={
      orgId:mongoose.Types.ObjectId(orgId),
      userId:mongoose.Types.ObjectId(userId)
    };
    var newEvents=new EventsCollection(data);
    newEvents.save(callback);
  },
  addTriggerToTransactionMaster:function(userId,transactionMasterId,goalId,callback){
    var temp={};
    temp["triggers."+transactionMasterId]=goalId;
    EventsCollection.update({userId:userId},{$push:temp},callback);
  },
  getGoalsTriggeredByTransactionMaster:function(userId,transactionMasterId,callback){
    EventsCollection.findOne({userId:userId},"triggers."+transactionMasterId,callback);
  }
};
module.exports=Events;
