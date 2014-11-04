// require('../app/server.js');
var chai=require("chai");
var should=chai.should();
var mongoose=require('mongoose');
var Users=require("../app/system/models/Users");
var NudgeMailModel=require('../app/system/models/NudgeMails');
mongoose.connect('mongodb://localhost/uabTest');
describe("test nudge-mail",function(){
    describe("static tests",function(){
        it("should create nudge-mail",function(done){
            NudgeMailModel.createNudgeMail({_id:"nudgemail1",subject:"New Mail", content:"This is a new Mail",sender:"user1",receivers:"user2",timestamp:new Date(),organizationId:"org1",read:"..."});
            done();
        });

        it("should get nudge-mail schema",function(done){
            NudgeMailModel.getNudgeMailSchema();
            done();
        });

        it("should get nudge-mail details",function(done){
            NudgeMailModel.getNudgeMailDetail("nudgemail1","content");
            done();
        });

        it("should get nudge-mail",function(done){
            NudgeMailModel.getNudgeMail("nudgemail1");
            done();
        });

        it("should get nudge-mail by orgId",function(done){
            NudgeMailModel.getNudgeMailByOrgId("org1");
            done();
        });

        it("should update nudge-mail",function(done){
            NudgeMailModel.updateNudgeMail("nudge1","content","This is an updated mail");
            done();
        });

        it("should delete nudge-mail",function(done){
            NudgeMailModel.deleteNudgeMail("nudgemail1");
            done();
        });

        it("should add receiver to nudge-mail",function(done){
            NudgeMailModel.addReceiverNudgeMail("nudgemail1","user3");
            done();
        });

        it("should delete receiver to nudge-mail",function(done){
            NudgeMailModel.deleteReceiverNudgeMail("nudgemail1","user3");
            done();
        });

    });
});
