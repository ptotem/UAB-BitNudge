var RanksCollection=require('./RanksCollection.js');
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
  getLeaderboardOfMonth:function(month,fields,options,populationData,callback){
    var currDate=moment(month);
    RanksCollection.find({$where:"this.month.getMonth()=="+month.getMonth()+"&&this.month.getYear()=="+month.getYear()},fields,options).populate(populationData).exec(callback);
  },
  setRankOfUser:function(month,rankNo,userId,callback){
    var rankObj={rankNo:rankNo,player:userId};
    RanksCollection.update({$where:"this.month.getMonth()=="+month.getMonth()+"&&this.month.getYear()=="+month.getYear()},{$push:{$each:[rankObj],$position:rankNo}});
  },
  setRankOfUserInTeam:function(month,rankNo,userId,teamId,callback){
    var rankObj={rankNo:rankNo,player:userId};
    RanksCollection.update({$where:"this.month.getMonth()=="+month.getMonth()+"&&this.month.getYear()=="+month.getYear(),"playerInTeamRanks.team":teamId},{$push:{playerInTeamRanks:{$each:[rankObj],$position:rankNo}}},callback);
  },
  setRankOfTeam:function(month,rankNo,teamId,callback){
    var rankObj={rankNo:rankNo,team:teamId};
    RanksCollection.update({$where:"this.month.getMonth()=="+month.getMonth()+"&&this.month.getYear()=="+month.getYear()},{$push:{$each:[rankObj],$position:rankNo}});
  },
  // //here quarter is a Date object
  // getLeaderboardOfQuarter:function(quarter,fields,options,populationData,callback){
  //   var currDate=moment(quarter);
  //   RanksCollection.find({$where:"this.quarter.getMonth()=="+quarter.getMonth()+"&&this.quarter.getYear()=="+quarter.getYear()},fields,options).populate(populationData).exec(function(err,docs){
  //     docs.forEach(function(doc){
  //       var date=moment(doc.date);
  //       if(currDate.quarter()==date.quarter())
  //         return callback(err,doc);
  //     });
  //     return callback(err,null);
  //   });
  // },
  getRankSchema:function(){
    return RanksCollection.Schema;
  }
};
module.exports=Leaderboard;
