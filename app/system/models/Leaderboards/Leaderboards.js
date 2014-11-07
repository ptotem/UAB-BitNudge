var LeaderboardCollection=require('./LeaderboardCollection.js');
var mongoose=require('mongoose');
var moment=require('moment');
var TeamsModel=require('../Teams');
var Leaderboard={
  createLeaderboard:function(orgId,period,date,leaderboardData,callback){
    if(!period)
      callback("enter a valid period");
    leaderboardData.period=period;
    leaderboardData.date=date;
    leaderboardData.orgId=mongoose.Types.ObjectId(orgId);
    var leaderboard=new LeaderboardCollection(leaderboardData);
    leaderboard.save(callback);
  },
  // getLeaderboard:function(id,fields,options,populationData,callback){
  //   if(populationData)
  //     LeaderboardCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  //   else
  //     LeaderboardCollection.findOne({_id:id},fields,options).exec(callback);
  // },
  makePlayerRankObject:function(rank,playerId){
    return {rankNo:rank,player:player};
  },
  getQueryFromDate:function(period,date){
    var currDate,start,end;
    if(period=="month"){
      currDate=moment(date);
      start=moment().month(currDate.month()).date(1).hour(0).minute(0).second(0).toDate();
      end=moment().month(currDate.month()+1).date(1).hour(0).minute(0).second(0).toDate();
    }
    else if(period=="quarter"){
      currDate=moment(date);
      start=moment().month(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
      end=moment().month(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
    }
    else if (period=="year"){
      currDate=moment(date);
      start=moment().year(moment(year)).month(0).date(1).hour(0).minute(0).second(0).toDate();
      end=moment().year(moment(year)+1).month(0).date(1).hour(0).minute(0).second(0).toDate();
    }
    return {date:{$gte:start,$lt:end},period:period};
  },
  //here month is a Date object
  getLeaderboardOfPeriod:function(orgId,period,date,fields,options,populationData,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    query.orgId=orgId;
    LeaderboardCollection.find(query,fields,options).populate(populationData).exec(callback);
  },
  getTeamLeaderboardOfPeriod:function(orgId,teamId,period,date,fields,options,populationData,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    query.orgId=orgId;
    query['playerInTeamRanks.team']=teamId;
    LeaderboardCollection.find(query,fields,options).populate(populationData).exec(callback);
  },
  initializeLeaderboardForPeriod:function(orgId,period,date,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    query.orgId=mongoose.Types.ObjectId(orgId);
    LeaderboardCollection.findOne(query,function(err,obj){
      if(!err&&!obj){
        Leaderboard.createLeaderboard(orgId,period,date,{},function(newErr,newLeaderboard){
          TeamsModel.getTeamsOfOrganization(orgId,"","","",function(teamErr,teams){
            teams.forEach(function(team){
              var tempTeamUpsert={team:mongoose.Types.ObjectId(team._id),playerRanks:[]};
              LeaderboardCollection.update({_id:newLeaderboard._id},{$push:{playerInTeamRanks:tempTeamUpsert}},callback);
            });
          });
        });
      }
      else callback(err,obj);
    });
  },
  setRankOfUserInPeriod:function(period,date,rankNo,orgId,userId,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    query.orgId=mongoose.Types.ObjectId(orgId);
    var temp={};
    var rankObj={rankNo:rankNo,player:userId};
    temp["playerRanks."+rankNo]=rankObj;
    // temp.period=period;
    LeaderboardCollection.update(query,{$set:temp},callback);
  },
  setRankOfUserInTeamInPeriod:function(period,date,rankNo,orgId,userId,teamId,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    query.orgId=mongoose.Types.ObjectId(orgId);
    query['playerInTeamRanks.team']=teamId;
    var temp={};
    var rankObj={rankNo:rankNo,player:userId};
    temp["playerInTeamRanks.$.playerRanks."+rankNo]=rankObj;
    // temp.date=date;
    // temp.period=period;
    LeaderboardCollection.update(query,{$set:temp},callback);
  },
  setRankOfTeamInPeriod:function(period,date,rankNo,orgId,teamId,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    query.orgId=mongoose.Types.ObjectId(orgId);
    var temp={};
    var rankObj={rankNo:rankNo,team:teamId};
    temp["teamRanks."+rankNo]=rankObj;
    // temp.date=date;
    // temp.period=period;
    LeaderboardCollection.update(query,{$set:temp},callback);
  },
  getUserRankOfPeriod:function(orgId,userId,period,date,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    query['playerRanks.player']=userId;
    query.orgId=orgId;
    LeaderboardCollection.findOne(query,"playerRanks.$",function(err,obj){
      if(err) res.send(err);
      else callback(err,obj.playerRanks[0]);
    });
  },
  getUserRankOfTeamOfPeriod:function(orgId,teamId,userId,period,date,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    query.orgId=orgId;
    LeaderboardCollection.aggregate({$match:{}},{$project:{playerInTeamRanks:1}},{$unwind:"$playerInTeamRanks"},{$match:{'playerInTeamRanks.team':mongoose.Types.ObjectId(teamId)}},{$unwind:"$playerInTeamRanks.playerRanks"},{$match:{'playerInTeamRanks.playerRanks.player':mongoose.Types.ObjectId(userId)}},{$group:{_id:"$_id",rankNo:{$last:'$playerInTeamRanks.playerRanks.rankNo'}}},function(err,obj){
      if(err) callback(err,obj);
      else callback(err,obj[0]);
    });
  },
  getTeamRankOfPeriod:function(orgId,teamId,period,date,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    query['teamRanks.team']=teamId;
    query.orgId=orgId;
    LeaderboardCollection.findOne(query,"teamRanks.$",function(err,obj){
      if(err) res.send(err);
      else callback(err,obj.teamRanks[0]);
    });
  },
  getRankSchema:function(){
    return LeaderboardCollection.Schema;
  }
};
module.exports=Leaderboard;
