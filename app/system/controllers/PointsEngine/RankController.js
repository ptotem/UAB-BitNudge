var LeaderboardModel=require('../../models/Leaderboards');
var UsersModel=require('../../models/Users').Users;
var UserPointsModel=require('../../models/UserPeriodPoints');
var OrganiztionsModel=require('../../models/Organizations');
var TeamPointsModel=require('../../models/TeamPeriodPoints');
var TeamsModel=require('../../models/Teams');
var mongoose=require('mongoose');

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
  calculateRankOfPeriod:function(orgId,period,date,callback){
    LeaderboardModel.initializeLeaderboardForPeriod(orgId,period,date,function(errAll,objAll){
      // setting user global ranks.
      console.log("starting calculation of leaderboard of "+period+":"+date+" at "+new Date().getTime());
      UserPointsModel.getSortedUserPointsOfPeriod({orgId:mongoose.Types.ObjectId(orgId)},period,date,function(err,userpoints){
        userpoints.forEach(function(userpoint,index){
          LeaderboardModel.setRankOfUserInPeriod(period,date,index+1,orgId,userpoint.userId,function(err,obj){
            if(err) callback(err);
            if(index==userpoints.length-1){
              // callback(err,obj);
              teamFn(err,obj);
            }
          });
        });
      });
      // setting team ranks.
      var teamFn=function(err,obj){
        TeamPointsModel.getSortedTeamPointsOfPeriod({orgId:mongoose.Types.ObjectId(orgId)},period,date,function(err,teampoints){
          teampoints.forEach(function(teampoint,index){
            LeaderboardModel.setRankOfTeamInPeriod(period,date,index+1,orgId,teampoint.teamId,function(setErr,setObj){
              if(err) callback(err);
              if(index==teampoints.length-1){
                userTeamFn(setErr,setObj);
              }
            });
          });
        });
      };
      // setting users ranks in teams
      var userTeamFn=function(err,obj){
        TeamsModel.getTeamsOfOrganization(orgId,"","","",function(teamsErr,teams){
          if(err) return callback(teamsErr);
          teams.forEach(function(team,index1){
            // if(index1==1){
            UserPointsModel.getSortedUserPointsOfPeriod({userId:{$in:team.members}},period,date,function(upErr,userpoints){
              if(err) return callback(upErr);
              userpoints.forEach(function(userpoint,index){
                LeaderboardModel.setRankOfUserInTeamInPeriod(period,date,index+1,orgId,userpoint.userId,team._id,function(setErr,setObj){
                  if(err) callback(setErr);
                  callback(setErr,setObj);
        console.log("ending at "+new Date().getTime());
                });
              });
            });
            // }
          });
        });
      };
    });
  }
};
module.exports=RankController;
