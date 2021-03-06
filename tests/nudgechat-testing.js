// require('../app/server.js');
var chai=require("chai");
var should=chai.should();
var mongoose=require('mongoose');
var Users=require("../app/system/models/Users");
var NudgeChatModel=require('../app/system/models/NudgeChat');
mongoose.connect('mongodb://localhost/uabTest');
describe("test nudge-chat",function(){
  describe("static tests",function(){
    it("should create nudge-chat",function(done){
        var d = new Date();
      NudgeChatModel.createNudgeChat("org1", {_id:"nudge1",userId:"user1",messages:[{content:"Nudge Testing",userId:"user1",timestamp:d}]});
      done();
    });

    it("should get nudge-chat schema",function(done){
      NudgeChatModel.getNudgeChatSchema(); 
      done();
    });

    it("should get nudge-chat",function(done){
      NudgeChatModel.getNudgeChat("nudge1","","","");
      done();
    });

    it("should get nudge-chat of user",function(done){
      NudgeChatModel.getNudgeChatOfUser("user1","","","");
      done();
    });

    it("should add message to nudge-chat",function(done){
      NudgeChatModel.addMessageToChat("user1", "Adding message to chat"); 
      done();
    });

    it("should delete nudge-chat",function(done){
      NudgeChatModel.deleteNudgeChat("nudge1"); 
      done();
    });

  });
});
