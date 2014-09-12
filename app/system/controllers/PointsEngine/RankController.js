var LeaderboardModel=require('../../models/Leaderboards');
var UsersModel=require('../../models/Users');
var UserPointsModel=require('../../models/UserPoints');
var OrganiztionsModel=require('../../models/Organizations');
var TeamPointsModel=require('../../models/TeamPoints');
var TeamsModel=require('../../models/Teams');

var RankController={
  calculateRankOfMonth:function(orgId,month){
    //setting user global ranks.
    UserPointsModel.UserMonthPoints.getAllSortedUserPointsOfMonth(month,function(err,userpoints){
      userpoints.forEach(function(index,userpoint){
        LeaderboardModel.MonthLeaderboard.setRankOfUser(month,index,userpoint.userId,function(err,obj){
          if(err) handleError(err);
        });
      });
    });
    //setting team ranks.
    TeamPointsModel.TeamMonthPoints.getAllSortedTeamPointsOfMonth(month,function(err,teampoints){
      teampoints.forEach(function(index,teampoint){
        LeaderboardModel.MonthLeaderboard.setRankOfTeam(month,index+1,teampoint.teamId,function(err,obj){
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
          UserPointsModel.UserMonthPoints.getSomeSortedUserPointsOfMonth({teams:{$elemMatch:team._id}},month,function(err,userpoints){
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
  calculateRankOfYear:function(orgId,year){
    //setting user global ranks.
    UserPointsModel.UserYearPoints.getAllSortedUserPointsOfYear(year,function(err,userpoints){
      userpoints.forEach(function(index,userpoint){
        LeaderboardModel.YearLeaderboard.setRankOfUser(year,index,userpoint.userId,function(err,obj){
          if(err) handleError(err);
        });
      });
    });
    //setting team ranks.
    TeamPointsModel.TeamYearPoints.getAllSortedTeamPointsOfYear(year,function(err,teampoints){
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
          UserPointsModel.UserYearPoints.getSomeSortedUserPointsOfYear({teams:{$elemMatch:team._id}},year,function(err,userpoints){
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
