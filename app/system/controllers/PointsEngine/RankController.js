var LeaderboardModel=require('../../models/Leaderboards');
var UsersModel=require('../../models/Users').Users;
var UserPointsModel=require('../../models/UserPeriodPoints');
var OrganiztionsModel=require('../../models/Organizations');
var TeamPointsModel=require('../../models/TeamPeriodPoints');
var TeamsModel=require('../../models/Teams');
var mongoose=require('mongoose');
var async=require('async');

//move this into the model later on. Right now needed to perform aggregate calls
var LeaderboardCollection=require('../../models/Leaderboards/LeaderboardCollection.js');

var RankController={
  calculateRankOfUserOfPeriod:function(orgId,userId,period,date,callback){
    LeaderboardModel.initializeLeaderboardForPeriod(orgId,period,date,function(errAll,objAll){  //this makes sure leaderboard is created if not exists.
      var query=LeaderboardModel.getQueryFromDate(period,date);
      query.orgId=mongoose.Types.ObjectId(orgId);
      var rankUpdateObject={};
      UserPointsModel.getUserPointsOfPeriod({userId:mongoose.Types.ObjectId(userId),orgId:mongoose.Types.ObjectId(orgId)},period,date,"","","",function(err,userpoints){
        var newUserPoints=userpoints.totalPoints;
        LeaderboardModel.getUserRankOfPeriod(orgId,userId,period,date,function(err,userRankData){
          var currentUserRank;
          var slice=false;
          if(userRankData){
            slice=true;
            currentUserRank=userRankData.rankNo;
          }
          else
            currentUserRank=0;
          var newRankNo=currentUserRank;  //setting default value of the new rank as the current rank.
          var playerQuery=JSON.parse(JSON.stringify(query));
          playerQuery['playerRanks.player']=mongoose.Types.ObjectId(userId);
          var algo=function(err,leaderboardData){
          // LeaderboardCollection.aggregate({$match:query},{$unwind:"$playerRanks"},{$skip:userRank},{$group:{_id:"$_id",playerRanks:{$push:"$playerRanks"}}},function(err,leaderboardData){
            if(slice){
              if(leaderboardData.playerRanks.length===0)
                currentUserRank=1;
              else currentUserRank=leaderboardData.playerRanks.length;
              var myPlayerObj=makePlayerRankObject(currentUserRank,userId);
              leaderboardData.playerRanks.push(myPlayerObj);
            }
            async.eachSeries(leaderboardData.playerRanks.reverse(),function(otherPlayerObj,callback){
              UserPointsModel.getUserPointsOfPeriod({userId:mongoose.Types.ObjectId(otherPlayerObj.player),orgId:mongoose.Types.ObjectId(orgId)},period,date,"","","",function(err,otherUserpoints){
                if(otherUserpoints.totalPoints>newUserPoints){
                  newRankNo=otherPlayerObj.rankNo+1;
                  var rankUpdateObject=leaderboardData.playerRanks.slice(newRankNo);
                  rankUpdateObject.forEach(function(oldRankObj,index){
                    if(oldRankObj.rankNo==currentUserRank){
                      oldRankObj.rankNo=newRankNo;
                    }
                    else {
                      oldRankObj.rankNo++;
                    }
                    rankUpdateObject['playerRanks.'+oldRankObj.rankNo]=oldRankObj;
                  });
                  LeaderboardCollection.update({_id:leaderboardData._id},{$set:rankUpdateObject},function(err,result){
                    if(err) callback(err);
                    else callback(null,"success");
                  });
                }
                else callback();
              });
            });
            // });
          };
          if(slice)
            LeaderboardCollection.findOne(playerQuery,"playerRanks").slice('playerRanks',currentUserRank).exec(algo);
          else 
            LeaderboardCollection.findOne(playerQuery,"playerRanks").exec(algo);
        });
      });
      UsersModel.getUser(userId,"teams","","",function(err,teams){
        teams.forEach(function(team){
          TeamPointsModel.getTeamPointsOfPeriod({teamId:mongoose.Types.ObjectId(team._id),orgId:mongoose.Types.ObjectId(orgId)},period,date,"","","",function(err,teampoints){
            var newTeamPoints=teampoints.totalPoints;
            var rankUpdateObject={};
            LeaderboardModel.getUserRankOfPeriod(orgId,userId,period,date,function(err,teamRankData){
              var currentTeamRank;
              var slice=false;
              if(teamRankData){
                slice=true;
                currentTeamRank=teamRankData.rankNo;
              }
              else
                currentTeamRank=0;
              var newRankNo=currentTeamRank;  //setting default value of the new rank as the current rank.
              var teamQuery=JSON.parse(JSON.stringify(query));
              teamQuery['teamRanks.team']=mongoose.Types.ObjectId(team._id);
              var algo=function(err,leaderboardData){
                if(slice){
                  if(leaderboardData.teamRanks.length===0)
                    currentTeamRank=1;
                  else currentTeamRank=leaderboardData.teamRanks.length;
                  var myTeamObj=makeTeamRankObject(currentTeamRank,team._id);
                  leaderboardData.playerRanks.push(myTeamObj);
                }
                async.eachSeries(leaderboardData.teamRanks.reverse(),function(otherPlayerObj,callback){
                  TeamPointsModel.getTeamPointsOfPeriod({teamId:mongoose.Types.ObjectId(otherPlayerObj.team)},period,date,"","","",function(err,otherTeampoints){
                    if(otherTeampoints.totalPoints>newTeamPoints){
                      newRankNo=otherPlayerObj.rankNo+1;
                      var rankUpdateObject=leaderboardData.playerRanks.slice(newRankNo);
                      rankUpdateObject.forEach(function(oldRankObj,index){
                        if(oldRankObj.rankNo==currentTeamRank){
                          oldRankObj.rankNo=newRankNo;
                        }
                        else {
                          oldRankObj.rankNo++;
                        }
                        rankUpdateObject['teamRanks.'+oldRankObj.rankNo]=oldRankObj;
                      });
                      LeaderboardCollection.update({_id:leaderboardData._id},{$set:rankUpdateObject},function(err,result){
                        if(err) callback(err);
                        else callback(null,"success");
                      });
                    }
                    else callback();
                  });
                });
              };
              if(slice)
                LeaderboardCollection.findOne(teamQuery,"teamRanks").slice('teamRanks',currentTeamRank).exec(algo);
              else
                LeaderboardCollection.findOne(teamQuery,"teamRanks").exec(algo);
            });
          });
          var playerTeamQuery=JSON.parse(JSON.stringify(query));
          // playerTeamQuery['teamRanks.team']={mongoose.Types.ObjectId(team._id)};
          UserPointsModel.getUserPointsOfPeriod({userId:mongoose.Types.ObjectId(userId),orgId:mongoose.Types.ObjectId(orgId)},period,date,"","","",function(err,userpoints){
            var newUserPoints=userpoints.totalPoints;
            LeaderboardCollection.getUserRankOfTeamOfPeriod(orgId,team._id,userId,period,date,function(err,userRank){
              var currentUserInTeamRank;
              var slice=false;
              if(userRank){
                slice=true;
                currentUserInTeamRank=userRank.rankNo;
              }
              else
                currentUserInTeamRank=0;
              var oldUserRank=userRank.rankNo;
              var algo=function(err,leaderboardData){
                if(slice){
                  if(leaderboardData.playerInTeamRanks.playerRanks.length===0)
                    currentUserInTeamRank=1;
                  else currentUserInTeamRank=leaderboardData.playerInTeamRanks.playerRanks.length;
                  var myTeamObj=makePlayerInTeamRankObject(currentUserInTeamRank,userId);
                  leaderboardData.playerInTeamRanks.playerRanks.push(myTeamObj);
                }
                leaderboardData.playerInTeamRanks.playerRanks.reverse().forEach(function(otherPlayerObj){
                  UserPointsModel.getUserPointsOfPeriod({userId:mongoose.Types.ObjectId(otherPlayerObj.player)},period,date,"","","",function(err,otherUserpoints){
                    if(otherUserpoints.totalPoints>newUserPoints){
                      newRankNo=otherPlayerObj.rankNo+1;
                      var rankUpdateObject=leaderboardData.playerInTeamRanks.playerRanks.slice(newRankNo);
                      rankUpdateObject.forEach(function(oldRankObj,index){
                        if(oldRankObj.rankNo==oldUserRank){
                          oldRankObj.rankNo=newRankNo;
                        }
                        else {
                          oldRankObj.rankNo++;
                        }
                      rankUpdateObject['playerInTeamRanks.$.playerRanks.'+oldRankObj.rankNo]=oldRankObj;
                      });
                      LeaderboardCollection.update({_id:leaderboardData._id,'playerInTeamRanks.team':team._id},{$set:rankUpdateObject},function(err,result){
                        if(err) callback(err);
                        else callback(null,"success");
                      });
                    }
                    else callback();
                  });
                });
              };
              if(slice)
                LeaderboardCollection.aggregate({$match:playerTeamQuery},{$unwind:"$playerInTeamRanks"},{$match:{"playerInTeamRanks.team":team._id}},{$unwind:"$playerInTeamRanks.playerRanks"},{$limit:oldUserRank+1},{$group:{_id:"$_id",playerInTeamRanks:{$push:"$playerInTeamRanks"}}},algo);
              else
                LeaderboardCollection.aggregate({$match:playerTeamQuery},{$unwind:"$playerInTeamRanks"},{$match:{"playerInTeamRanks.team":team._id}},{$unwind:"$playerInTeamRanks.playerRanks"},{$group:{_id:"$_id",playerInTeamRanks:{$push:"$playerInTeamRanks"}}},algo);
            });
          });
        });
      });
    });
  },
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
