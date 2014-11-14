var NotificationCenterModel=require('../models/NotificationCenter');

var NotificationsController={
  getNotificationsOfUser:function(req,res){
    NotificationCenterModel.getNotificationsOfUser(req.params.userId,"","","",function(err,notifs){
      if(err)res.send(err);
      else res.send(notifs);
    });
  }
};
module.exports=NotificationsController;

