// require('../app/server.js');
var chai=require("chai");
var should=chai.should();
var mongoose=require('mongoose');
var StoreItem=require("../app/system/models/StoreItem");
var Organization=require("../app/system/models/Organizations");
var StoreModel=require('../app/system/models/Store');
mongoose.connect('mongodb://localhost/uabTest');
describe("test nudge-mail",function(){
    describe("static tests",function(){
        it("should create store",function(done){
            StoreModel.createSocialFeed("org1",{_id:"social1",user:"user1",messages:"msg1"});
            done();
        });

        it("should get store schema",function(done){
            StoreModel.getSocialFeedSchema();
            done();
        });

        it("should get store",function(done){
            StoreModel.getSocialFeed("social1","","","");
            done();
        });

        it("should get store of userId",function(done){
            StoreModel.getSocialFeedOfUser("user1","","","");
            done();
        });

        it("should add msg to store",function(done){
            StoreModel.addMessageToFeed("user1","msg2");
            done();
        });

        it("should update store",function(done){
            StoreModel.updateSocialFeed("social1", "product", "Product2");
            done();
        });

        it("should delete store",function(done){
            StoreModel.deleteSocialFeed("social1");
            done();
        });

    });
});
