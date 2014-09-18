var RanksCollection=require('./QuarterLeaderboardCollection.js');
var mongoose=require('mongoose');
var moment=require('moment');
var Leaderboard={
  createLeaderboard:function(orgId,leaderboardData,callback){
    leaderboardData.orgId=mongoose.Schema.Types.ObjectId(orgId);
    leaderboardData.quarter=new Date();
    var leaderboard=new RanksCollection(leaderboardData);
  },
  getLeaderboard:function(id,fields,options,populationData,callback){
    RanksCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  //here quarter is a Date object
  getLeaderboardOfQuarter:function(quarter,fields,options,populationData,callback){
    var currDate=moment(quarter);
    var start=moment().month(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
    RanksCollection.find({quarter:{$gte:start,$lt:end}},fields,options).populate(populationData).exec(function(err,docs){
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
    var start=moment().month(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
    RanksCollection.find({quarter:{$gte:start,$lt:end}}).populate(populationData).exec(function(err,docs){
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
    var start=moment().month(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
    RanksCollection.update({quarter:{$gte:start,$lt:end},"playerInTeamRanks.team":teamId},{$push:{"playerInTeamRanks.$.playerRanks":{$each:[rankObj],$position:rankNo}}},callback);
    // RanksCollection.find({$where:this.quarter.get});
  },
  setRankOfTeam:function(month,rankNo,teamId,callback){
    var rankObj={rankNo:rankNo,team:teamId};
    var start=moment().month(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
    RanksCollection.update({quarter:{$gte:start,$lt:end}},{$push:{teamRanks:{$each:[rankObj],$position:rankNo}}});
  },
  getRankSchema:function(){
    return RanksCollection.Schema;
  }
};
module.exports=Leaderboard;
