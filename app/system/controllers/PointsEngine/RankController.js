var LeaderboardModel=require('../../models/Leaderboards');
var UsersModel=require('../../models/Users');
var UserPointsModel=require('../../models/UserPoints');
var OrganiztionsModel=require('../../models/Organizations');
var TeamPointsModel=require('../../models/TeamPoints');
var TeamsModel=require('../../models/Teams');

var RankController={
  calculateRankOfMonth:function(orgId,month,callback){
    //setting user global ranks.
    UserPointsModel.UserMonthPoints.getSortedUserPointsOfMonth({},month,function(err,userpoints){
      userpoints.forEach(function(userpoint,index){
        LeaderboardModel.MonthLeaderboard.setRankOfUser(month,index+1,userpoint.userId,function(err,obj){
          if(err) handleError(err);
          if(index==userpoints.length-1){
            callback(err);
          }
        });
      });
    });

    //setting team ranks.
    TeamPointsModel.TeamMonthPoints.getSortedTeamPointsOfMonth(null,month,function(err,teampoints){
      teampoints.forEach(function(teampoint,index){
        LeaderboardModel.MonthLeaderboard.setRankOfTeam(month,index+1,teampoint.teamId,function(err,obj){
          if(err) handleError(err);
          if(index==teampoints.length-1){
            // callback(err);
          }
        });
      });
    });
    //setting users ranks in teams
    TeamsModel.getTeamsInOrg(orgId,function(err,teams){
      if(err) return handleError(err);
      teams.forEach(function(team){
        team.members.forEach(function(memberId,index){
          UserPointsModel.UserMonthPoints.getSortedUserPointsOfMonth({userId:{$in:team.members}},month,function(err,userpoints){
            if(err) return handleError(err);
            userpoints.forEach(function(index,userpoint){
              LeaderboardModel.MonthLeaderboard.setRankOfUserInTeam(month,index+1,userpoint.userId,team._id,function(err,obj){
                if(err) handleError(err);
              });
            });
          });
        });
      });
    });
  },
  calculateRankOfQuarter:function(orgId,quarter,callback){
    //setting user global ranks.
    UserPointsModel.UserQuarterPoints.getSortedUserPointsOfQuarter({},quarter,function(err,userpoints){
      userpoints.forEach(function(userpoint,index){
        LeaderboardModel.QuarterLeaderboard.setRankOfUser(quarter,index+1,userpoint.userId,function(err,obj){
          if(err) handleError(err);
          if(index==userpoints.length-1){
            callback(err);
          }
        });
      });
    });

    //setting team ranks.
    TeamPointsModel.TeamQuarterPoints.getSortedTeamPointsOfQuarter(null,quarter,function(err,teampoints){
      teampoints.forEach(function(teampoint,index){
        LeaderboardModel.QuarterLeaderboard.setRankOfTeam(quarter,index+1,teampoint.teamId,function(err,obj){
          if(err) handleError(err);
          if(index==teampoints.length-1){
            // callback(err);
          }
        });
      });
    });
    //setting users ranks in teams
    TeamsModel.getTeamsInOrg(orgId,function(err,teams){
      if(err) return handleError(err);
      teams.forEach(function(team){
        team.members.forEach(function(memberId,index){
          UserPointsModel.UserQuarterPoints.getSortedUserPointsOfQuarter({userId:{$in:team.members}},quarter,function(err,userpoints){
            if(err) return handleError(err);
            userpoints.forEach(function(index,userpoint){
              LeaderboardModel.QuarterLeaderboard.setRankOfUserInTeam(quarter,index+1,userpoint.userId,team._id,function(err,obj){
                if(err) handleError(err);
              });
            });
          });
        });
      });
    });
  },
  calculateRankOfYear:function(orgId,year){
    //setting user global ranks.
    UserPointsModel.UserYearPoints.getSortedUserPointsOfYear(year,function(err,userpoints){
      userpoints.forEach(function(index,userpoint){
        LeaderboardModel.YearLeaderboard.setRankOfUser(year,index,userpoint.userId,function(err,obj){
          if(err) handleError(err);
        });
      });
    });
    //setting team ranks.
    TeamPointsModel.TeamYearPoints.getSortedTeamPointsOfYear(year,function(err,teampoints){
      teampoints.forEach(function(index,teampoint){
        LeaderboardModel.YearLeaderboard.setRankOfTeam(year,index+1,teampoint.teamId,function(err,obj){
          if(err) handleError(err);
        });
      });
    });
    //setting users ranks in teams
    TeamsModel.getTeamsInOrg(orgId,function(err,teams){
      if(err) return handleError(err);
      teams.forEach(function(team){
        team.members.forEach(function(index,memberId){
          // UsersModel.sortUsersByField({orgId:orgId},"totalPoints",function(err,users){
          UserPointsModel.UserYearPoints.getSortedUserPointsOfYear({teams:{$elemMatch:team._id}},year,function(err,userpoints){
            if(err) return handleError(err);
            userpoints.forEach(function(index,userpoint){
              LeaderboardModel.YearLeaderboard.setRankOfUserInTeam(year,index+1,userpoint.userId,team._id,function(err,obj){
                if(err) handleError(err);
              });
            });
          });
        });
      });
    });
  }
};
module.exports=RankController;
