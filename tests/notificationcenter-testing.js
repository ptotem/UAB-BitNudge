// require('../app/server.js');
var chai=require("chai");
var should=chai.should();
var mongoose=require('mongoose');
var UsersModel=require("../app/system/models/Users");
var OrganizationsModel=require("../app/system/models/Organizations");
var NotificationModel=require('../app/system/models/NotificationCenter');
mongoose.connect('mongodb://localhost/uabTest');
describe("test notification",function(){
  describe("static tests",function(){
    it("should create notification",function(done){
      NotificationModel.createNotificationCenter("org1", {_id:"not1", userId:"user1", notifications:[{content:"Testing Notifications",entity:"...",read:true}]});
      done();
    });

    it("should get notification center",function(done){
      NotificationModel.getNotificationCenter("not1", "", ""); 
      done();
    });

    it("should get notification center of user",function(done){
      NotificationModel.getNotificationCenterOfUser("user1", "", ""); 
      done();
    });

    it("should get notification of user",function(done){
      NotificationModel.getNotificationsOfUser("user1");
      done();
    });

    it("should add notification",function(done){
      NotificationModel.addNotification("not1", [{content:"New Notifications",entity:"...",read:true}]);
      done();
    });

    it("should get notification center schema",function(done){
      NotificationModel.getNotificationCenterSchema(); 
      done();
    });

    it("should update notification center",function(done){
      NotificationModel.updateNotificationCenter("not1", "orgId", "OrgUpdate"); 
      done();
    });

  });
});
