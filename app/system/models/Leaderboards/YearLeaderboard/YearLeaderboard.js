var RanksCollection=require('./YearLeaderboardCollection.js');
var moment=require('moment');
var Leaderboard={
  createLeaderboard:function(orgId,leaderboardData,callback){
    leaderboardData.orgId=orgId;
    leaderboardData.date=new Date();
    var leaderboard=new RanksCollection(leaderboardData);
  },
  getLeaderboard:function(id,fields,options,populationData,callback){
    RanksCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  //here month is a Date object
  getLeaderboardOfYear:function(year,fields,options,populationData,callback){
    var currDate=moment(year);
    RanksCollection.find({$where:"this.year.getYear()=="+year.getYear()},fields,options).populate(populationData).exec(callback);
  },
  setRankOfUser:function(month,rankNo,userId,callback){
    var rankObj={rankNo:rankNo,player:userId};
    RanksCollection.update({$where:"this.month.getYear()=="+month.getYear()},{$push:{playerRanks:{$each:[rankObj],$position:rankNo}}});
  },
  setRankOfUserInTeam:function(year,rankNo,userId,teamId,callback){
    var rankObj={rankNo:rankNo,player:userId};
    RanksCollection.update({$where:"this.year.getYear()=="+year.getYear(),"playerInTeamRanks.team":teamId},{$push:{playerInTeamRanks:{$each:[rankObj],$position:rankNo}}},callback);
  },
  setRankOfTeam:function(year,rankNo,teamId,callback){
    var rankObj={rankNo:rankNo,team:teamId};
    RanksCollection.update({$where:"this.year.getYear()=="+year.getYear()},{$push:{teamRanks:{$each:[rankObj],$position:rankNo}}});
  },
  getRankSchema:function(){
    return RanksCollection.Schema;
  }
};
module.exports=Leaderboard;
