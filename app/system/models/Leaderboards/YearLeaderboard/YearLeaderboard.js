var RanksCollection=require('./YearLeaderboardCollection.js');
var mongoose=require('mongoose');
var moment=require('moment');
var Leaderboard={
  createLeaderboard:function(orgId,leaderboardData,callback){
    leaderboardData.orgId=mongoose.Schema.Types.ObjectId(orgId);
    leaderboardData.year=new Date();
    var leaderboard=new RanksCollection(leaderboardData);
  },
  getLeaderboard:function(id,fields,options,populationData,callback){
    RanksCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  //here month is a Date object
  getLeaderboardOfYear:function(year,fields,options,populationData,callback){
    var currDate=moment(year);
    var start=moment().year(moment(year)).month(0).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().year(moment(year)+1).month(0).date(1).hour(0).minute(0).second(0).toDate();
    if(populationData)
      RanksCollection.find({year:{$gte:start,$lt:end}},fields,options).populate(populationData).exec(callback);
    else
      RanksCollection.find({year:{$gte:start,$lt:end}},fields,options).exec(callback);
  },
  setRankOfUser:function(month,rankNo,userId,callback){
    var rankObj={rankNo:rankNo,player:userId};
    var start=moment().year(moment(year)).month(0).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().year(moment(year)+1).month(0).date(1).hour(0).minute(0).second(0).toDate();
    RanksCollection.update({month:{$gte:start,$lt:end}},{$push:{playerRanks:{$each:[rankObj],$position:rankNo}}});
  },
  setRankOfUserInTeam:function(year,rankNo,userId,teamId,callback){
    var rankObj={rankNo:rankNo,player:userId};
    var start=moment().year(moment(year)).month(0).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().year(moment(year)+1).month(0).date(1).hour(0).minute(0).second(0).toDate();
    RanksCollection.update({month:{$gte:start,$lt:end},"playerInTeamRanks.team":teamId},{$push:{"playerInTeamRanks.$.playerRanks":{$each:[rankObj],$position:rankNo}}},callback);
  },
  setRankOfTeam:function(year,rankNo,teamId,callback){
    var rankObj={rankNo:rankNo,team:teamId};
    var start=moment().year(moment(year)).month(0).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().year(moment(year)+1).month(0).date(1).hour(0).minute(0).second(0).toDate();
    RanksCollection.update({month:{$gte:start,$lt:end}},{$push:{teamRanks:{$each:[rankObj],$position:rankNo}}});
  },
  getRankSchema:function(){
    return RanksCollection.Schema;
  }
};
module.exports=Leaderboard;
