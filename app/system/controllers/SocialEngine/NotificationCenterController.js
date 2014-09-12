var NotificationCenterModel=require('../../models/NotificationCenter');
var NotificationCenterController={
  getNotificationsOfUser:function(req,res){
    NotificationCenterModel.getNotificationsOfUser(req.query.userId,callback);
  }
};
module.exports=NotificationCenterController;
