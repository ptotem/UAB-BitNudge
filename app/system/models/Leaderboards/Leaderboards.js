// var Leaderboards={
// };
// module.exports=Leaderboards;
var RanksCollection=require('./LeaderboardCollection.js');
var mongoose=require('mongoose');
var moment=require('moment');
var Leaderboard={
  createLeaderboard:function(orgId,period,date,leaderboardData,callback){
    if(!period)
      callback("enter a valid period");
    leaderboardData.period=period;
    leaderboardData.date=date;
    leaderboardData.orgId=mongoose.Types.ObjectId(orgId);
    var leaderboard=new RanksCollection(leaderboardData,false);
    leaderboard.save(callback);
  },
  getLeaderboard:function(id,fields,options,populationData,callback){
    if(populationData)
      RanksCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
    else
      RanksCollection.findOne({_id:id},fields,options).exec(callback);
  },
  getQueryFromDate:function(period,date){
    var currDate,start,end;
    if(period=="month"){
      currDate=moment(date);
      start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
      end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
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
    RanksCollection.find(query,fields,options).populate({path:'playerRanks.player'}).exec(callback);
  },
  getTeamLeaderboardOfPeriod:function(orgId,teamId,period,date,fields,options,populationData,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    query.orgId=orgId;
    query['playerInTeamRanks.team']=teamId;
    RanksCollection.find(query,fields,options).populate(populationData).exec(callback);
  },
  setRankOfUserInPeriod:function(period,date,rankNo,userId,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    query.orgId=orgId;
    var temp={};
    temp["playerRanks."+rankNo]=rankObj;
    temp.date=date;
    temp.period=period;
    RanksCollection.update(query,{$set:temp},{upsert:true},callback);
  },
  setRankOfUserInTeamInPeriod:function(period,date,rankNo,userId,teamId,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    query['playerInTeamRanks.team']=teamId;
    var temp={};
    temp["playerInTeamRanks.$.playerRanks."+rankNo]=rankObj;
    temp.date=date;
    temp.period=period;
    RanksCollection.update(query,{$set:temp},{upsert:true},callback);
  },
  setRankOfTeamInPeriod:function(period,date,rankNo,teamId,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    var temp={};
    temp["teamRank."+rankNo]=rankObj;
    temp.date=date;
    temp.period=period;
    RanksCollection.update(query,{$set:temp},{upsert:true},callback);
  },
  // getUserRank:function(userId,month,callback){
    // var query=Leaderboard.getQueryFromDate(period,date);
  //   RanksCollection.find({month:{$gte:start,$lt:end},'playerRanks.player':userId},function(err,obj){
  //     // if(err) return callback(err);
  //     // else return callback(err,obj.playerRanks.)
  //   });
  // },
  // getTeamRank:function(teamId,month,callback){
    // var query=Leaderboard.getQueryFromDate(period,date);
  //   RanksCollection.find({month:{$gte:start,$lt:end},'teamRanks.team':teamId},function(err,obj){
  //     if(err) return callback(err);
  //     else return callback(err,obj);
  //   });
  // },
  getRankSchema:function(){
    return RanksCollection.Schema;
  }
};
module.exports=Leaderboard;
