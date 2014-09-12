var RanksCollection=require('./MonthLeaderboardCollection.js');
var mongoose=require('mongoose');
var moment=require('moment');
var Leaderboard={
  createLeaderboard:function(orgId,leaderboardData,callback){
        leaderboardData.orgId=mongoose.Schema.Types.ObjectId(orgId);
    leaderboardData.date=new Date();
    var leaderboard=new RanksCollection(leaderboardData);
    leaderboard.save();
  },
  getLeaderboard:function(id,fields,options,populationData,callback){
    RanksCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  //here month is a Date object
  getLeaderboardOfMonth:function(month,fields,options,populationData,callback){
    var currDate=moment(month);
    RanksCollection.find({/*$where:"this.month.getMonth()=="+month.getMonth()+"&&this.month.getYear()=="+month.getYear()*/},fields,options).populate(populationData).exec(callback);
  },
  setRankOfUser:function(month,rankNo,userId,callback){
    var rankObj={rankNo:rankNo,player:userId};
//console.log(rankNo);
//console.log("starting update");
    RanksCollection.update({/*$where:"this.month.getMonth()=="+month.getMonth()+"&&this.month.getYear()=="+month.getYear()*/},{$push:{playerRanks:{$each:[rankObj],$position:rankNo}}},function(err,obj){});//console.log(err);console.log(obj);});
  },
  setRankOfUserInTeam:function(month,rankNo,userId,teamId,callback){
    var rankObj={rankNo:rankNo,player:userId};
    RanksCollection.update({$where:"this.month.getMonth()=="+month.getMonth()+"&&this.month.getYear()=="+month.getYear(),"playerInTeamRanks.team":teamId},{$push:{playerInTeamRanks:{$each:[rankObj],$position:rankNo}}},callback);
  },
  setRankOfTeam:function(month,rankNo,teamId,callback){
    var rankObj={rankNo:rankNo,team:teamId};
    RanksCollection.update({$where:"this.month.getMonth()=="+month.getMonth()+"&&this.month.getYear()=="+month.getYear()},{$push:{teamRanks:{$each:[rankObj],$position:rankNo}}});
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
