// require('../app/server.js');
var chai=require("chai");
var should=chai.should();
var mongoose=require('mongoose');
var Product=require("../app/system/models/Products");
var Client=require("../app/system/models/Clients");
var Users=require("../app/system/models/Users");
var Organization=require("../app/system/models/Organizations");
var RevenuesModel=require('../app/system/models/Revenues');
mongoose.connect('mongodb://localhost/uabTest');
describe("test nudge-mail",function(){
    describe("static tests",function(){
        it("should create revenue",function(done){
            RevenuesModel.createRevenue({_id:"revenue1",name:"Revenue1",product:"product1",client:"client1",user:"user1",organizationId:"org1"});
            done();
        });

        it("should get revenue schema",function(done){
            RevenuesModel.getRevenueSchema();
            done();
        });

        it("should get revenue details",function(done){
            RevenuesModel.getRevenueDetail("revenue1","product");
            done();
        });

        it("should get revenue",function(done){
            RevenuesModel.getRevenue("revenue1");
            done();
        });

        it("should get revenue by orgId",function(done){
            RevenuesModel.getRevenue("org1");
            done();
        });

        it("should update revenue",function(done){
            RevenuesModel.updateRevenue("revenue1", "product", "Product2");
            done();
        });

        it("should delete revenue",function(done){
            RevenuesModel.deleteRevenue("revenue1");
            done();
        });

    });
});
