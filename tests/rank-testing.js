// require('../app/server.js');
var chai=require("chai");
var should=chai.should();
var mongoose=require('mongoose');
var OrganizationsModel=require("../app/system/models/Organizations");
var UsersModel=require('../app/system/models/Users');
var UserPointsModel=require("../app/system/models/UserPoints");
var LeaderboardModel=require('../app/system/models/Leaderboards');
var RankController=require('../app/system/controllers/PointsEngine/RankController.js');
mongoose.connect('mongodb://localhost/uabTest');
describe("test ranks",function(){
  describe("static tests",function(){
    // it("should create user related everything",function(done){
    //   OrganizationsModel.createOrganization({_id:"org1",name:"Ptotem",location:"Wadala"},done);
    //   for(var i=0;i<100;i++){
    //     UsersModel.createUser("org1",{_id:"user"+i,name:"User"+i,password:"test"});
    //   }
    //   for(i=0;i<100;i++){
    //     var points=Math.floor(Math.random()*9001+1000);
    //     UserPointsModel.UserMonthPoints.createUserMonthPoints("org1",{userId:"user"+i,_id:"points"+i,month:new Date(),totalPoints:points});
    //   }
    //   LeaderboardModel.MonthLeaderboard.createLeaderboard("org1",{});
    //   for(i=0;i<10;i++){
    //   }
    // });
    it("should calculateRankOfMonth properly",function(done){
      this.timeout(15000);
      console.log("starting now");
      console.log(new Date().getTime());
      RankController.calculateRankOfMonth("org1",new Date(),function(t){
        console.log("ending now");
        console.log(new Date().getTime());
        done(t);
      });
    });
    // it("should set setRankOfTeam",function(){
    //   LeaderboardModel.MonthLeaderboard.setRankOfUser(new Date(),1,"user1");
    // });
    // it("should update orgs",function(done){
    //   OrganizationsModel.updateOrg("5413e0fadfd734bc6d500652","location","Powai",function(err,obj){
    //     // obj.name.should.equal("Ptotem");
    //     done(err);
    //   });
    // });
    // it("should query orgs",function(done){
    //   OrganizationsModel.getOrganization("5413e0fadfd734bc6d500652","name location",{sort:"name"},function(err,obj){
    //     obj.location.should.equal("Powai");
    //     done(err);
    //   });
    // });
  });
});
