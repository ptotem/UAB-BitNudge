// require('../app/server.js');
var chai=require("chai");
var should=chai.should();
var mongoose=require('mongoose');
var Users=require("../app/system/models/Users");
var Organization=require("../app/system/models/Organizations");
var StatusMessageModel=require('../app/system/models/StatusMessages');
mongoose.connect('mongodb://localhost/uabTest');
describe("test status-message",function(){
    describe("static tests",function(){
        it("should create status-message",function(done){
            StatusMessageModel.createStatusMessage({_id:"statusmsg1",content:"Message content", userId:"user1", parentId:"user1", orgId:"org1", messages:"msg1", likes:"..."});
            done();
        });

        it("should get status-message schema",function(done){
            StatusMessageModel.getStatusMessageSchema();
            done();
        });

        it("should get status-message details",function(done){
            StatusMessageModel.getStatusMessageDetail("statusmsg1","content");
            done();
        });

        it("should get status-message",function(done){
            StatusMessageModel.getStatusMessage("statusmsg1");
            done();
        });

        it("should add action to status-message",function(done){
            StatusMessageModel.addActionIntoStatusMessage("statusmsg1","action1");
            done();
        });

        it("should remove action to status-message",function(done){
            StatusMessageModel.removeActionFromStatusMessage("statusmsg1","action1");
            done();
        });

        it("should update status-message",function(done){
            StatusMessageModel.updateStatusMessage("social1", "content", "Updated content.");
            done();
        });

        it("should delete status-message",function(done){
            StatusMessageModel.deleteStatusMessage("statusmsg1");
            done();
        });

    });
});
/**
 * Created by ptotem on 15/9/14.
 */
