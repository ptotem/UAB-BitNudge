var LeaderboardModel=require('../../models/Leaderboards');
var UsersModel=require('../../models/Users');
var UserPointsModel=require('../../models/UserPoints');
var OrganiztionsModel=require('../../models/Organizations');
var TeamPointsModel=require('../../models/TeamPoints');
var TeamsModel=require('../../models/Teams');

var RankController={
  // getUserRank:function(req,res){
  //   LeaderboardModel.getUserRank(req.params.userId,new Date(),function(err,obj){
  //     if(err) res.send(err);
  //     else res.send(obj);
  //   });
  // },
  // getTeamRank:function(req,res){
  //   LeaderboardModel.getTeamRank(req.params.teamId,new Date(),function(err,obj){
  //     if(err) res.send(err);
  //     else res.send(obj);
  //   });
  // },
  calculateRankOfMonth:function(orgId,month,callback){
    //setting user global ranks.
    UserPointsModel.getSortedUserPointsOfPeriod({orgId:orgId},"month",month,function(err,userpoints){
      userpoints.forEach(function(userpoint,index){
        LeaderboardModel.setRankOfUserInPeriod("month",month,index+1,userpoint.userId,function(err,obj){
          if(err) handleError(err);
          if(index==userpoints.length-1){
            callback(err);
          }
        });
      });
    });

    //setting team ranks.
    TeamPointsModel.getSortedTeamPointsOfPeriod({orgId:orgId},"month",month,function(err,teampoints){
      console.log(teampoints);
      teampoints.forEach(function(teampoint,index){
        LeaderboardModel.setRankOfTeamInPeriod("month",month,index+1,teampoint.teamId,function(err,obj){
          if(err) handleError(err);
          if(index==teampoints.length-1){
            // callback(err);
          }
        });
      });
    });
    //setting users ranks in teams
    TeamsModel.getTeamsOfOrganization(orgId,function(err,teams){
      if(err) return handleError(err);
      teams.forEach(function(team){
        UserPointsModel.getSortedUserPointsOfPeriodOfOrganization({userId:{$in:team.members}},"month",month,function(err,userpoints){
          if(err) return handleError(err);
          userpoints.forEach(function(userpoint,index){
            LeaderboardModel.setRankOfUserInTeamInPeriod("month",month,index+1,userpoint.userId,team._id,function(err,obj){
              if(err) handleError(err);
            });
          });
        });
      });
    });
  },
  calculateRankOfQuarter:function(orgId,quarter,callback){
    //setting user global ranks.
    UserPointsModel.getUserPointsOfPeriod({orgId:orgId},"quarter",quarter,function(err,userpoints){
      userpoints.forEach(function(userpoint,index){
        LeaderboardModel.setRankOfUserInPeriod("quarter",quarter,index+1,userpoint.userId,function(err,obj){
          if(err) handleError(err);
          if(index==userpoints.length-1){
            callback(err);
          }
        });
      });
    });
    //setting team ranks.
    TeamPointsModel.getSortedTeamPointsOfPeriod({orgId:orgId},"quarter",quarter,function(err,teampoints){
      teampoints.forEach(function(teampoint,index){
        LeaderboardModel.setRankOfTeamInPeriod("quarter",quarter,index+1,teampoint.teamId,function(err,obj){
          if(err) return handleError(err);
          if(index==teampoints.length-1){
            // callback(err);
          }
        });
      });
    });
    //setting users ranks in teams
    TeamsModel.getTeamsOfOrganization(orgId,function(err,teams){
      if(err) return handleError(err);
      teams.forEach(function(team){
        UserPointsModel.getSortedUserPointsOfPeriod({userId:{$in:team.members}},"quarter",quarter,function(err,userpoints){
          if(err) return handleError(err);
          userpoints.forEach(function(userpoint,index){
            LeaderboardModel.setRankOfUserInTeamInPeriod("quarter",quarter,index+1,userpoint.userId,team._id,function(err,obj){
              if(err) handleError(err);
            });
          });
        });
      });
    });
  },
  calculateRankOfYear:function(orgId,year){
    //setting user global ranks.
    UserPointsModel.getUserPointsOfPeriod({orgId:orgId},"year",year,function(err,userpoints){
      userpoints.forEach(function(userpoint,index){
        LeaderboardModel.setRankOfUserInPeriod("year",year,index+1,userpoint.userId,function(err,obj){
          if(err) handleError(err);
        });
      });
    });
    //setting team ranks.
    TeamPointsModel.getSortedTeamPointsOfPeriod({orgId:orgId},"year",year,function(err,teampoints){
      teampoints.forEach(function(teampoint,index){
        LeaderboardModel.setRankOfTeamInPeriod("year",year,index+1,teampoint.teamId,function(err,obj){
          if(err) handleError(err);
        });
      });
    });
    //setting users ranks in teams
    TeamsModel.getTeamsOfOrganization(orgId,function(err,teams){
      if(err) return handleError(err);
      teams.forEach(function(team){
        UserPointsModel.getSortedUserPointsOfPeriod({userId:{$in:team.members}},"year",year,function(err,userpoints){
          if(err) return handleError(err);
          userpoints.forEach(function(userpoint,index){
            LeaderboardModel.setRankOfUserInTeamInPeriod("year",year,index+1,userpoint.userId,team._id,function(err,obj){
              if(err) handleError(err);
            });
          });
        });
      });
    });
  }
};
module.exports=RankController;
