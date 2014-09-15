var RanksCollection=require('./MonthLeaderboardCollection.js');
var mongoose=require('mongoose');
var moment=require('moment');
var Leaderboard={
  createLeaderboard:function(orgId,leaderboardData,callback){
    // leaderboardData.orgId=mongoose.Schema.Types.ObjectId(orgId);
    leaderboardData.orgId=orgId;
    leaderboardData.month=new Date();
    var leaderboard=new RanksCollection(leaderboardData,false);
    leaderboard.save();
  },
  getLeaderboard:function(id,fields,options,populationData,callback){
    RanksCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  //here month is a Date object
  getLeaderboardOfMonth:function(month,fields,options,populationData,callback){
    var currDate=moment(month);
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    RanksCollection.find({month:{$gte:start,$lt:end}},fields,options).populate(populationData).exec(callback);
  },
  setRankOfUser:function(month,rankNo,userId,callback){
    var rankObj={rankNo:rankNo,player:userId};
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    // console.log(start);
    // console.log(end);
    var temp={};
    temp["playerRanks."+rankNo]=rankObj;
    RanksCollection.update({/* month:{$gte:start,$lt:end }*/},{$set:temp},callback);
  },
  setRankOfUserInTeam:function(month,rankNo,userId,teamId,callback){
    var rankObj={rankNo:rankNo,player:userId};
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    RanksCollection.update({month:{$gte:start,$lt:end},"playerInTeamRanks.team":teamId},{$push:{"playerInTeamRanks.$.playerRanks":{$each:[rankObj],$position:rankNo}}},callback);
  },
  setRankOfTeam:function(month,rankNo,teamId,callback){
    var rankObj={rankNo:rankNo,team:teamId};
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    RanksCollection.update({month:{$gte:start,$lt:end}},{$push:{teamRanks:{$each:[rankObj],$position:rankNo}}});
  },
  getRankSchema:function(){
    return RanksCollection.Schema;
  }
};
module.exports=Leaderboard;
