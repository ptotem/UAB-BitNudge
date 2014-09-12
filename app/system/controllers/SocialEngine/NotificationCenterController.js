var NotificationCenterModel=require('../../models/NotificationCenter');
var NotificationCenterController={
  getNotificationsOfUser:function(userId,callback){
    NotificationCenterModel.getNotificationsOfUser(userId,callback);
  }
};
module.exports=NotificationCenterController;
