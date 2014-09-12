var RanksCollection=require('./QuarterLeaderboardCollection.js');
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
  //here quarter is a Date object
  getLeaderboardOfQuarter:function(quarter,fields,options,populationData,callback){
    var currDate=moment(quarter);
    RanksCollection.find({$where:"this.quarter.getYear()=="+quarter.getYear()},fields,options).populate(populationData).exec(function(err,docs){
      docs.forEach(function(doc){
        var date=moment(doc.date);
        if(currDate.quarter()==date.quarter())
          return callback(err,doc);
      });
      return callback(err,null);
    });
  },
  setRankOfUser:function(quarter,rankNo,userId,callback){
    var rankObj={rankNo:rankNo,player:userId};
    // RanksCollection.update({$where:"this.quarter.getYear()=="+quarter.getYear()},{$push:{$each:[rankObj],$position:rankNo}});
    var currDate=moment(quarter);
    RanksCollection.find({$where:"this.quarter.getYear()=="+quarter.getYear()},fields,options).populate(populationData).exec(function(err,docs){
      docs.forEach(function(doc){
        var date=moment(doc.date);
        if(currDate.quarter()==date.quarter()){
          return callback(err,doc);
        }
      });
      return callback(err,null);
    });
  },
  setRankOfUserInTeam:function(month,rankNo,userId,teamId,callback){
    var rankObj={rankNo:rankNo,player:userId};
    RanksCollection.update({$where:"this.month.getMonth()=="+month.getMonth()+"&&this.month.getYear()=="+month.getYear(),"playerInTeamRanks.team":teamId},{$push:{playerInTeamRanks:{$each:[rankObj],$position:rankNo}}},callback);
    RanksCollection.find({$where:this.quarter.get});
  },
  setRankOfTeam:function(month,rankNo,teamId,callback){
    var rankObj={rankNo:rankNo,team:teamId};
    RanksCollection.update({$where:"this.month.getMonth()=="+month.getMonth()+"&&this.month.getYear()=="+month.getYear()},{$push:{teamRanks:{$each:[rankObj],$position:rankNo}}});
  },
  getRankSchema:function(){
    return RanksCollection.Schema;
  }
};
module.exports=Leaderboard;
