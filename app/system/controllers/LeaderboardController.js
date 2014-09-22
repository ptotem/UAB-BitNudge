var LeaderboardsModel=require('../models/Leaderboards');

var LeaderboardsController={
  getTeamLeaderboard:function(req,res){
    if(req.query.month)
      LeaderboardsModel.MonthLeaderboard.getTeamLeaderboardOfMonth(req.params.orgId,req.params.teamId,"",{select:"playerInTeamRanks.$"},{path:'playerInTeamRanks.playerRanks.player'},function(err,obj){
        if(err) res.send(err);
        else res.send(obj);
      });
    // else if(req.query.quarter)
    //   LeaderboardsModel.QuarterLeaderboard.getTeamLeaderboardOfQuarter(req.params.orgId,req.params.teamId,function(err,obj){
    //     if(err) res.send(err);
    //     else res.send(obj);
    //   });
    // else if(req.query.quarter)
    //   LeaderboardsModel.YearLeaderboard.getTeamLeaderboardOfYear(req.params.orgId,req.params.teamId,function(err,obj){
    //     if(err) res.send(err);
    //     else res.send(obj);
    //   });
    // else
    //   LeaderboardsModel.MonthLeaderboard.getTeamLeaderboardOfMonth(req.params.orgId,req.params.teamId,function(err,obj){
    //     if(err) res.send(err);
    //     else res.send(obj);
    //   });
  },
  getUserLeaderboard:function(req,res){
    if(req.query.month)
      LeaderboardsModel.MonthLeaderboard.getLeaderboardOfMonth(req.params.orgId,new Date(req.query.month),"playerRanks",{},{path:'playerRanks',model:'users'},function(err,obj){
        if(err) res.send(err);
        else res.send(obj);
      });
    // else if(req.query.quarter)
    //   LeaderboardsModel.QuarterLeaderboard.getLeaderboardOfQuarter(req.params.orgId,req.params.teamId,"playerRanks",{},null,function(err,obj){
    //     if(err) res.send(err);
    //     else res.send(obj);
    //   });
    // else if(req.query.quarter)
    //   LeaderboardsModel.YearLeaderboard.getLeaderboardOfYear(req.params.orgId,req.params.teamId,"playerRanks",{},null,function(err,obj){
    //     if(err) res.send(err);
    //     else res.send(obj);
    //   });
    // else
    //   LeaderboardsModel.MonthLeaderboard.getLeaderboardOfMonth(req.params.orgId,req.params.teamId,"playerRanks",{},null,function(err,obj){
    //     if(err) res.send(err);
    //     else res.send(obj);
    //   });
    // UsersModel.getLeaderboards(req.params.userId,function(err,goals){
    //   if(err) res.send(err);
    //   else res.send(goals);
    // });
  },
  getOrganizationLeaderboard:function(req,res){
    if(req.query.month)
      LeaderboardsModel.MonthLeaderboard.getLeaderboardOfMonth(req.params.orgId,new Date(req.query.month),"teamRanks",{},{path:'teamRanks.team'},function(err,obj){
        if(err) res.send(err);
        else res.send(obj);
      });
    // else if(req.query.quarter)
    //   LeaderboardsModel.QuarterLeaderboard.getLeaderboardOfQuarter(req.params.orgId,req.params.teamId,"teamRanks",{},null,function(err,obj){
    //     if(err) res.send(err);
    //     else res.send(obj);
    //   });
    // else if(req.query.quarter)
    //   LeaderboardsModel.YearLeaderboard.getLeaderboardOfYear(req.params.orgId,req.params.teamId,"teamRanks",{},null,function(err,obj){
    //     if(err) res.send(err);
    //     else res.send(obj);
    //   });
    // else
    //   LeaderboardsModel.MonthLeaderboard.getLeaderboardOfMonth(req.params.orgId,req.params.teamId,"teamRanks",{},null,function(err,obj){
    //     if(err) res.send(err);
    //     else res.send(obj);
    //   });
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
