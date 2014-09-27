var NotificationCenterCollection=require('./NotificationCenterCollection.js');
var mongoose=require('mongoose');

var NotificationCenter={
  createNotificationCenter:function(organizationId,userId,data,callback){
    data.orgId=mongoose.Types.ObjectId(organizationId);
    data.createdAt=new Date();
    data.userId=mongoose.Types.ObjectId(userId);
    var l=new NotificationCenterCollection(data);
    l.save(callback);
  },
  getNotificationCenter:function(id,fields,options,populationData,callback){
    NotificationCenterCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getNotificationCenterOfUser:function(userId,fields,options,populationData,callback){
    NotificationCenterCollection.find({userId:userId},fields,options).populate(populationData).exec(callback);
  },
  getNotificationsOfUser:function(userId,fields,options,callback){
    NotificationCenterCollection.findOne({userId:userId},fields,options,function(err,obj){
      if(err) handleError(err);
      return callback(err,obj.notifications);
    });
  },
  addNotification:function(userId,notificationData,callback){
    NotificationCenterCollection.update({userId:userId},{$push:{notifications:notificationData}},callback);
  },
  getNotificationCenterSchema:function(){
    return NotificationCenterCollection.Schema;
  },
  deleteNotificationCenter:function(userId,callback){
    NotificationCenterCollection.remove({userId:userId},callback);
  },
  updateNotificationCenter:function(id,updateData,callback){
    NotificationCenterCollection.update({_id:id},{$set:updateData},callback);
  }
};
module.exports=NotificationCenter;
