// require('../app/server.js');
var chai=require("chai");
var should=chai.should();
var mongoose=require('mongoose');
var OrganizationsModel=require("../app/system/models/Organizations");
var MedalsModel=require('../app/system/models/Medals');
mongoose.connect('mongodb://localhost/uabTest');
describe("test medals",function(){
  describe("static medals",function(){
    it("should create medals",function(done){
      MedalsModel.createMedal("org1", {_id:"medal1",name:"Medal1"});
      done();
    });

    it("should get medal schema",function(done){
      MedalsModel.getMedalSchema("medal1"); 
      done();
    });

    it("should get medal",function(done){
      MedalsModel.getMedal("medal1");
      done();
    });

    it("should get medals of organization",function(done){
      MedalsModel.getMedalsOfOrganization("org1"); 
      done();
    });

    it("should update medal",function(done){
      MedalsModel.updateMedal("medal1", "name", "MedalUpdate"); 
      done();
    });

  });
});
