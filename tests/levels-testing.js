// require('../app/server.js');
var chai=require("chai");
var should=chai.should();
var mongoose=require('mongoose');
var OrganizationsModel=require("../app/system/models/Organizations");
var LevelsModel=require('../app/system/models/Levels');
mongoose.connect('mongodb://localhost/uabTest');
describe("test levels",function(){
  describe("static tests",function(){
    it("should create level",function(done){
      LevelsModel.createLevel("org1", {_id:"level1",name:"Level1"});
      done();
    });

    it("should get level schema",function(done){
      LevelsModel.getLevelSchema(); 
      done();
    });

    it("should get level",function(done){
      LevelsModel.getLevel("level1");
      done();
    });

    it("should update level",function(done){
      LevelsModel.updateLevel("level1", "name", "LevelUpdate"); 
      done();
    });

    it("should delete level",function(done){
      LevelsModel.deleteLevel("level1"); 
      done();
    });

  });
});
