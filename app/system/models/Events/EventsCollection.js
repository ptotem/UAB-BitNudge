var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var EventsCollection={
  orgId:Schema.Types.ObjectId,
  userId:Schema.Types.ObjectId,
  //here the data is stored as-
  //{transactionMasterId:[goalId]}
  triggers:Schema.Types.Mixed
};
module.exports=EventsCollection;
