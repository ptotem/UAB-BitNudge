var LeaderboardModel=require('../../models/Leaderboard');
var UsersModel=require('../../models/Users');
var UserPointsModel=require('../../models/UserPoints');
var OrganiztionsModel=require('../../models/Organizations');
var TeamPointsModel=require('../../models/TeamPoints');
var TeamsModel=require('../../models/Teams');

var RankController={
  calculateRankOfMonth:function(orgId,month){
    //setting user global ranks.
    UserPointsModel.getAllSortedUserPointsOfMonth(month,function(err,userpoints){
      userpoints.forEach(function(index,userpoint){
        LeaderboardModel.setRankOfUser(month,index,userpoint.userId,function(err,obj){
          if(err) handleError(err);
        });
      });
    });
    //setting team ranks.
    TeamPointsModel.getAllSortedTeamPointsOfMonth(month,function(err,teampoints){
      teampoints.forEach(function(index,teampoint){
        LeaderboardModel.setRankOfTeam(month,index+1,teampoint.teamId,function(err,obj){
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
          UserPointsModel.getSomeSortedUserPointsOfMonth({teamId:team._id},month,function(err,userpoints){
            if(err) return handleError(err);
            userpoints.forEach(function(index,userpoint){
              LeaderboardModel.setRankOfUserInTeam(month,index+1,userpoint.userId,team._id,function(err,obj){
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
