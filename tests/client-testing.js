// require('../app/server.js');
var chai=require("chai");
var should=chai.should();
var mongoose=require('mongoose');
var OrganizationsModel=require("../app/system/models/Organizations");
var ClientModel=require('../app/system/models/Clients');
mongoose.connect('mongodb://localhost/uabTest');
describe("test client",function(){
  describe("static tests",function(){
    it("should create client",function(done){
      ClientModel.createClient({_id:"client1",name:"Client1",org_Name:"PTotem", organizationId: "org1"});
      done();
    });

    it("should get client details",function(done){
      ClientModel.getClientDetail("client1", "name"); 
      done();
    });

    it("should get client schema",function(done){
      ClientModel.getClientSchema("client1"); 
      done();
    });

    it("should get client",function(done){
      ClientModel.getClient("client1");
      done();
    });

    it("should get client by orgId",function(done){
      ClientModel.getClientByOrg("org1"); 
      done();
    });

    it("should update client",function(done){
      ClientModel.updateClient("product1", "name:ClientUpdate");
      done();
    });

    it("should delete client",function(done){
      ClientModel.deleteClient("product1"); 
      done();
    });

  });
});
