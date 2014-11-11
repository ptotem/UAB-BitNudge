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
    calculateRankOfUserOfPeriod:function(orgId,userId,period,date,finalCallback){
      LeaderboardModel.initializeLeaderboardForPeriod(orgId,period,date,function(errAll,objAll){  //this makes sure leaderboard is created if not exists.
        var query=LeaderboardModel.getQueryFromDate(period,date);
        query.orgId=mongoose.Types.ObjectId(orgId);
        async.series([
          function(callback){
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
                var newRankNo;
                var playerQuery=JSON.parse(JSON.stringify(query));
                var rankUpdateObject={};
                var algo=function(err,leaderboardData){
                  if(!slice){
                    if(leaderboardData.playerRanks.length===0){
                      leaderboardData.playerRanks[0]=null;
                      currentUserRank=1;
                    }
                    else currentUserRank=leaderboardData.playerRanks.length;
                    var myPlayerObj=LeaderboardModel.makePlayerRankObject(currentUserRank,userId);
                    leaderboardData.playerRanks.push(myPlayerObj);
                  }
                  newRankNo=currentUserRank;  //setting default value of the new rank as the current rank.
                  var reversedArray=leaderboardData.playerRanks.slice().reverse();
                  async.eachSeries(reversedArray,function(otherPlayerObj,callback){
                    if(otherPlayerObj!==null)
                      UserPointsModel.getUserPointsOfPeriod({userId:mongoose.Types.ObjectId(otherPlayerObj.player),orgId:mongoose.Types.ObjectId(orgId)},period,date,"","","",function(err,otherUserpoints){
                        newRankNo=otherPlayerObj.rankNo;
                        if(otherUserpoints.totalPoints>newUserPoints){
                          callback("successfulQuit");
                        }
                        else callback();
                      });
                    else callback();
                  },
                  function(err,results){
                    ranksToChange=leaderboardData.playerRanks.slice(newRankNo);
                    ranksToChange.forEach(function(oldRankObj,index){
                      if(oldRankObj.rankNo==currentUserRank){
                        oldRankObj.rankNo=newRankNo;
                      }
                      else {
                        oldRankObj.rankNo++;
                      }
                      rankUpdateObject['playerRanks.'+oldRankObj.rankNo]=oldRankObj;
                    });
                    if(err&&err!=="successfulQuit")
                      callback(err);
                    else
                      LeaderboardCollection.update({_id:leaderboardData._id},{$set:rankUpdateObject},function(err,result){
                        if(err) callback(err);
                        else callback(null,"success");
                      });
                  });
                };
                if(slice)
                  LeaderboardCollection.findOne(playerQuery,"-playerInTeamRanks -teamRanks").slice('playerRanks',currentUserRank+1).exec(algo);
                else
                  LeaderboardCollection.findOne(playerQuery,"playerRanks").exec(algo);
              });
            });
          },
          function(upperCallback){
            UsersModel.getUser(userId,"teams","","",function(err,teamsObj){
                var teams=teamsObj.teams;
                teams.forEach(function(team){
                  async.series([
                    // function(callback){
                    //   TeamPointsModel.getTeamPointsOfPeriod({teamId:mongoose.Types.ObjectId(team),orgId:mongoose.Types.ObjectId(orgId)},period,date,"","","",function(err,teampoints){
                    //     var newTeamPoints=teampoints.totalPoints;
                    //     LeaderboardModel.getTeamRankOfPeriod(orgId,team,period,date,function(err,teamRankData){
                    //       var currentTeamRank;
                    //       var slice=false;
                    //       if(teamRankData){
                    //         slice=true;
                    //         currentTeamRank=teamRankData.rankNo;
                    //       }
                    //       else
                    //         currentTeamRank=0;
                    //       var teamQuery=JSON.parse(JSON.stringify(query));
                    //       var rankUpdateObject={};
                    //       var algo=function(err,leaderboardData){
                    //         if(!slice){
                    //           if(leaderboardData.teamRanks.length===0){
                    //             leaderboardData.teamRanks[0]=null;
                    //             currentTeamRank=1;
                    //           }
                    //           else currentTeamRank=leaderboardData.teamRanks.length;
                    //           var myTeamObj=LeaderboardModel.makeTeamRankObject(currentTeamRank,team);
                    //           leaderboardData.teamRanks.push(myTeamObj);
                    //         }
                    //         var newRankNo=currentTeamRank;  //setting default value of the new rank as the current rank.
                    //         var reversedArray=leaderboardData.teamRanks.slice().reverse();
                    //         async.eachSeries(reversedArray,function(otherPlayerObj,callback){
                    //           if(otherPlayerObj!==null)
                    //             TeamPointsModel.getTeamPointsOfPeriod({teamId:mongoose.Types.ObjectId(otherPlayerObj.team)},period,date,"","","",function(err,otherTeampoints){
                    //               newRankNo=otherPlayerObj.rankNo;
                    //               if(otherTeampoints.totalPoints>newTeamPoints){
                    //                 callback("successfulQuit");
                    //               }
                    //               else callback();
                    //             });
                    //           else callback();
                    //         },
                    //         function(err,results){
                    //           var ranksToChange=leaderboardData.teamRanks.slice(newRankNo);
                    //           ranksToChange.forEach(function(oldRankObj,index){
                    //             if(oldRankObj.rankNo==currentTeamRank){
                    //               oldRankObj.rankNo=newRankNo;
                    //             }
                    //             else {
                    //               oldRankObj.rankNo++;
                    //             }
                    //             rankUpdateObject['teamRanks.'+oldRankObj.rankNo]=oldRankObj;
                    //           });
                    //           if(err&&err!=="successfulQuit")
                    //             callback(err);
                    //           else
                    //             LeaderboardCollection.update({_id:leaderboardData._id},{$set:rankUpdateObject},function(err,result){
                    //               if(err) callback(err);
                    //               else callback(null,"success");
                    //             });
                    //         });
                    //       };
                    //       if(slice)
                    //         LeaderboardCollection.findOne(teamQuery,"-playerInTeamRanks -playerRanks").slice('teamRanks',currentTeamRank+1).exec(algo);
                    //       else
                    //         LeaderboardCollection.findOne(teamQuery,"teamRanks").exec(algo);
                    //     });
                    //   });
                    // },
                  // function(callback){
                  //   UserPointsModel.getUserPointsOfPeriod({userId:mongoose.Types.ObjectId(userId),orgId:mongoose.Types.ObjectId(orgId)},period,date,"","","",function(err,userpoints){
                  //     var newUserPoints=userpoints.totalPoints;
                  //     LeaderboardModel.getUserRankOfTeamOfPeriod(orgId,team,userId,period,date,function(err,userRank){
                  //       var currentUserInTeamRank;
                  //       var slice=false;
                  //       if(userRank){
                  //         slice=true;
                  //         currentUserInTeamRank=userRank.rankNo;
                  //       }
                  //       else
                  //         currentUserInTeamRank=0;
                  //       var rankUpdateObject={};
                  //       var algo=function(err,leaderboardDataObj){
                  //         var leaderboardData=leaderboardDataObj[0];
                  //         if(!slice){
                  //           if(leaderboardData.playerInTeamRanks.playerRanks.length===0){
                  //             leaderboardData.playerInTeamRanks.playerRanks[0]=null;
                  //             currentUserInTeamRank=1;
                  //           }
                  //           else currentUserInTeamRank=leaderboardData.playerInTeamRanks.playerRanks.length;
                  //           var myTeamObj=LeaderboardModel.makePlayerInTeamRankObject(currentUserInTeamRank,userId);
                  //           leaderboardData.playerInTeamRanks.playerRanks.push(myTeamObj);
                  //         }
                  //         var newRankNo=currentUserInTeamRank;  //setting default value of the new rank as the current rank.
                  //         var reversedArray=leaderboardData.playerInTeamRanks.playerRanks.slice().reverse();
                  //         async.eachSeries(reversedArray,function(otherPlayerObj,callback){
                  //           if(otherPlayerObj!==null)
                  //             UserPointsModel.getUserPointsOfPeriod({userId:mongoose.Types.ObjectId(otherPlayerObj.player)},period,date,"","","",function(err,otherUserpoints){
                  //               newRankNo=otherPlayerObj.rankNo;
                  //               if(otherUserpoints.totalPoints>newUserPoints){
                  //                 callback("successfulQuit");
                  //               }
                  //               else callback();
                  //             });
                  //           else callback();
                  //         },
                  //         function(err,results){
                  //           var ranksToChange=leaderboardData.playerInTeamRanks.playerRanks.slice(newRankNo);
                  //           ranksToChange.forEach(function(oldRankObj,index){
                  //             if(oldRankObj.rankNo==currentUserInTeamRank){
                  //               oldRankObj.rankNo=newRankNo;
                  //             }
                  //             else {
                  //               oldRankObj.rankNo++;
                  //             }
                  //             rankUpdateObject['playerInTeamRanks.$.playerRanks.'+oldRankObj.rankNo]=oldRankObj;
                  //           });
                  //           if(err&&err!=="successfulQuit")
                  //             callback(err);
                  //           else
                  //             LeaderboardCollection.update({_id:leaderboardData._id,'playerInTeamRanks.team':team},{$set:rankUpdateObject},function(err,result){
                  //                 if(err) callback(err);
                  //                 else callback(null,"success");
                  //             });
                  //         });
                  //       };
                  //       if(slice)
                  //         LeaderboardCollection.aggregate({$match:query},{$unwind:"$playerInTeamRanks"},{$match:{"playerInTeamRanks.team":team}},{$unwind:"$playerInTeamRanks.playerRanks"},{$limit:currentUserInTeamRank+1},{$group:{_id:"$_id",playerRanks:{$push:"$playerInTeamRanks.playerRanks"},team:{$last:"$playerInTeamRanks.team"}}},{$group:{_id:"$_id",'playerInTeamRanks':{$last:{playerRanks:"$playerRanks",team:"$team"}}}},algo);
                  //       else
                  //         LeaderboardCollection.aggregate({$match:query},{$unwind:"$playerInTeamRanks"},{$match:{"playerInTeamRanks.team":team}},{$group:{_id:"$_id",'playerInTeamRanks':{$last:"$playerInTeamRanks"}}},algo);
                  //     });
                  //   });
                  // }
                ],
                  function(err,results){
                    upperCallback(err);
                  });
                });
              });
          }],
          function(err,results){
            finalCallback(err,results);
        });
      });
    },
    // calculateRankOfPeriod:function(orgId,period,date,callback){
    //     LeaderboardModel.initializeLeaderboardForPeriod(orgId,period,date,function(errAll,objAll){
    //         // setting user global ranks.
    //         console.log("starting calculation of leaderboard of "+period+":"+date+" at "+new Date().getTime());
    //         UserPointsModel.getSortedUserPointsOfPeriod({orgId:mongoose.Types.ObjectId(orgId)},period,date,function(err,userpoints){
    //             userpoints.forEach(function(userpoint,index){
    //                 LeaderboardModel.setRankOfUserInPeriod(period,date,index+1,orgId,userpoint.userId,function(err,obj){
    //                     if(err) callback(err);
    //                     if(index==userpoints.length-1){
    //                         // callback(err,obj);
    //                         teamFn(err,obj);
    //                     }
    //                 });
    //             });
    //         });
    //         // setting team ranks.
    //         var teamFn=function(err,obj){
    //             TeamPointsModel.getSortedTeamPointsOfPeriod({orgId:mongoose.Types.ObjectId(orgId)},period,date,function(err,teampoints){
    //                 teampoints.forEach(function(teampoint,index){
    //                     LeaderboardModel.setRankOfTeamInPeriod(period,date,index+1,orgId,teampoint.teamId,function(setErr,setObj){
    //                         if(err) callback(err);
    //                         if(index==teampoints.length-1){
    //                             userTeamFn(setErr,setObj);
    //                         }
    //                     });
    //                 });
    //             });
    //         };
    //         // setting users ranks in teams
    //         var userTeamFn=function(err,obj){
    //             TeamsModel.getTeamsOfOrganization(orgId,"","","",function(teamsErr,teams){
    //                 if(err) return callback(teamsErr);
    //                 teams.forEach(function(team,index1){
    //                     // if(index1==1){
    //                     UserPointsModel.getSortedUserPointsOfPeriod({userId:{$in:team.members}},period,date,function(upErr,userpoints){
    //                         if(err) return callback(upErr);
    //                         userpoints.forEach(function(userpoint,index){
    //                             LeaderboardModel.setRankOfUserInTeamInPeriod(period,date,index+1,orgId,userpoint.userId,team._id,function(setErr,setObj){
    //                                 if(err) callback(setErr);
    //                                 callback(setErr,setObj);
    //                                 console.log("ending at "+new Date().getTime());
    //                             });
    //                         });
    //                     });
    //                     // }
    //                 });
    //             });
    //         };
    //     });
    // }
};
module.exports=RankController;
