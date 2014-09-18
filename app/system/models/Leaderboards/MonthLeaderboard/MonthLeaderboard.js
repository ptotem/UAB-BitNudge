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
    if(populationData)
      RanksCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
    else
      RanksCollection.findOne({_id:id},fields,options).exec(callback);
  },
  //here month is a Date object
  getLeaderboardOfMonth:function(orgId,month,fields,options,populationData,callback){
    var currDate=moment(month);
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    if(populationData)
      RanksCollection.find({orgId:orgId,month:{$gte:start,$lt:end}},fields,options).populate(populationData).exec(callback);
    else 
      RanksCollection.find({orgId:orgId,month:{$gte:start,$lt:end}},fields,options).exec(callback);
  },
  getTeamLeaderboardOfMonth:function(orgId,teamId,month,fields,options,populationData,callback){
    var currDate=moment(month);
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    if(populationData)
      RanksCollection.find({orgId:orgId,month:{$gte:start,$lt:end},'playerInTeamRanks.team':teamId},fields,options).populate(populationData).exec(callback);
    else 
      RanksCollection.find({orgId:orgId,month:{$gte:start,$lt:end}},fields,options).exec(callback);
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
  getUserRank:function(userId,month,callback){
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    RanksCollection.find({month:{$gte:start,$lt:end},'playerRanks.player':userId},function(err,obj){
      // if(err) return callback(err);
      // else return callback(err,obj.playerRanks.)
    });
  },
  getTeamRank:function(teamId,month,callback){
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    RanksCollection.find({month:{$gte:start,$lt:end},'teamRanks.team':teamId},function(err,obj){
      if(err) return callback(err);
      else return callback(err,obj);
    });
  },
  getRankSchema:function(){
    return RanksCollection.Schema;
  }
};
module.exports=Leaderboard;
