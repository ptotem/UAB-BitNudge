var LeaderboardsModel=require('../models/Leaderboards');
var UserCollection=require('../models/Users/UsersCollection.js');

var LeaderboardsController={
  getTeamLeaderboard:function(req,res){
    var period;
    for(var property in req.query){
      if(property=="month"||property=="quarter"||property=="year")
        period=property;
    }
    if(!period)
      return res.send("Please a valid period");
    LeaderboardsModel.getTeamLeaderboardOfPeriod(req.params.orgId,req.params.teamId,period,req.query[period],"",{select:"playerInTeamRanks.$"},{path:'playerInTeamRanks.playerRanks.player'},function(err,obj){
      if(err) res.send(err);
      else res.send(obj[0]);
    });
  },
  getUserLeaderboard:function(req,res){
    if(req.query.month)
      LeaderboardsModel.getLeaderboardOfPeriod(req.params.orgId,"month",new Date(req.query.month),"playerRanks",{},{path:'playerRanks.player',model:'users',select:'name teams'},function(err,obj){
        //check if teams need to be populated
        UserCollection.populate(obj,{path:'playerRanks.player.teams',model:'teams',select:"name"},function(err1,obj1){
          if(err) res.send(err1);
          else res.send(obj1[0]);
        });
      });
  },
  getOrganizationLeaderboard:function(req,res){
    if(req.query.month)
      LeaderboardsModel.getLeaderboardOfPeriod(req.params.orgId,"month",new Date(req.query.month),"teamRanks",{},{path:'teamRanks.team'},function(err,obj){
        if(err) res.send(err);
        else res.send(obj[0]);
      });
  },
  getUserRankOfPeriod:function(req,res){
    if(req.query.month)
      LeaderboardsModel.getUserRankOfPeriod(req.params.orgId,req.params.userId,"month",new Date(req.query.month),function(err,obj){
        if(err) res.send(err);
        else res.send(obj);
      });
  },
  getTeamRankOfPeriod:function(req,res){
    if(req.query.month)
      LeaderboardsModel.getTeamRankOfPeriod(req.params.orgId,req.params.teamId,"month",new Date(req.query.month),function(err,obj){
        if(err) res.send(err);
        else res.send(obj);
      });
  },
  getMovers:function(req,res){
    UserLeaderboardsModel.getLeaderboardsOfOrganization(req.params.orgId,function(err,objs){
      if(err) res.send(err);
      else res.send(objs);
    });
  },
  getShakers:function(req,res){
    UserLeaderboardsModel.getLeaderboardsOfOrganization(req.params.orgId,function(err,objs){
      if(err) res.send(err);
      else res.send(objs);
    });
  }
};
module.exports=LeaderboardsController;
