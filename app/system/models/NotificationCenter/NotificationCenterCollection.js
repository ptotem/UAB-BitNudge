var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var NotificationCenterSchema=new Schema({
  userId:Schema.Types.ObjectId,
  orgId:Schema.Types.ObjectId,
  notifications:[{
    content:String,
    entity:String,
    read:Boolean
  }],
  createdAt:Date
});
var NotificationCenterCollection=mongoose.model('notificationCenter',NotificationCenterSchema);
module.exports=NotificationCenterCollection;
