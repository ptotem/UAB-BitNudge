// require('../app/server.js');
var chai=require("chai");
var should=chai.should();
var mongoose=require('mongoose');
var Users=require("../app/system/models/Users");
var Organization=require("../app/system/models/Organizations");
var SocialFeedsModel=require('../app/system/models/SocialFeed');
mongoose.connect('mongodb://localhost/uabTest');
describe("test nudge-mail",function(){
    describe("static tests",function(){
        it("should create social-feeds",function(done){
            SocialFeedsModel.createSocialFeed("org1",{_id:"social1",user:"user1",messages:"msg1"});
            done();
        });

        it("should get social-feeds schema",function(done){
            SocialFeedsModel.getSocialFeedSchema();
            done();
        });

        it("should get social-feeds",function(done){
            SocialFeedsModel.getSocialFeed("social1","","","");
            done();
        });

        it("should get social-feeds of userId",function(done){
            SocialFeedsModel.getSocialFeedOfUser("user1","","","");
            done();
        });

        it("should add msg to social-feeds",function(done){
            SocialFeedsModel.addMessageToFeed("user1","msg2");
            done();
        });

        it("should update social-feed",function(done){
            SocialFeedsModel.updateSocialFeed("social1", "product", "Product2");
            done();
        });

        it("should delete social-feed",function(done){
            SocialFeedsModel.deleteSocialFeed("social1");
            done();
        });

    });
});

