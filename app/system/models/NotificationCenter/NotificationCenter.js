var NotificationCenterCollection=require('./NotificationCenterCollection.js');

var NotificationCenter={
  createNotificationCenter:function(organizationId,data){
    data.orgId=organizationId;
    data.createdAt=new Date();
    var l=new NotificationCenterCollection(data);
    l.save();
    return true;
  },
  getNotificationCenter:function(id,fields,options,populationData,callback){
    NotificationCenterCollection.findOne({_id:id},fields,options,callback);
  },
  getNotificationCenterOfUser:function(userId,fields,options,callback){
    NotificationCenterCollection.find({userId:userId},fields,options,callback);
  },
  getNotificationsOfUser:function(userId,fields,options,callback){
    NotificationCenterCollection.findOne({userId:userId},fields,options,function(err,obj){
      if(err) handleError(err);
      return callback(err,obj.notifications);
    });
  },
  addNotification:function(id,notificationData,callback){
    NotificationCenterCollection.update({_id:id},{$push:{notifications:notificationData}},callback);
  },
  getNotificationCenterSchema:function(){
    return NotificationCenterCollection.Schema;
  },
  updateNotificationCenter:function(id,updateData,callback){
    NotificationCenterCollection.update({_id:id},{$set:updateData},callback);
  }
};
module.exports=NotificationCenter;
