// require('../app/server.js');
var chai=require("chai");
var should=chai.should();
var mongoose=require('mongoose');
var Users=require("../app/system/models/Users");
var NudgeMailModel=require('../app/system/models/NudgeMailbox');
mongoose.connect('mongodb://localhost/uabTest');
describe("test nudge-mail",function(){
  describe("static tests",function(){
    it("should create nudge-mailbox",function(done){
        NudgeMailModel.createNudgeMailbox("org1", {_id:"nudgemailbox1",userId:"user1",mails:"mail1"});
      done();
    });

    it("should get nudge-mailbox schema",function(done){
        NudgeMailModel.getNudgeMailboxSchema();
      done();
    });

    it("should get nudge-mailbox",function(done){
        NudgeMailModel.getNudgeMailbox("nudgemailbox1","","","");
      done();
    });

      it("should get nudge-mailbox of user",function(done){
          NudgeMailModel.getNudgeMailboxOfUser("user1","","","");
          done();
      });

    it("should add message to nudge-mailbox",function(done){
        NudgeMailModel.addMailToUserMailbox("user1", "mail1");
      done();
    });

    it("should delete nudge-mailbox",function(done){
        NudgeMailModel.deleteNudgeMailbox("nudgemailbox1");
      done();
    });

  });
});
