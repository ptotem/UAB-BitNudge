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
  getLeaderboardOfWeek:function(week,fields,options,populationData,callback){
    var currDate=moment(week);
    RanksCollection.find({$where:"this.week.getMonth()=="+week.getMonth()+"&&this.week.getYear()=="+week.getYear()},fields,options).populate(populationData).exec(callback);
  },
  //here week is a Date object
  getLeaderboardOfQuarter:function(quarter,fields,options,populationData,callback){
    var currDate=moment(quarter);
    RanksCollection.find({$where:"this.quarter.getMonth()=="+quarter.getMonth()+"&&this.quarter.getYear()=="+quarter.getYear()},fields,options).populate(populationData).exec(function(err,docs){
      docs.forEach(function(doc){
        var date=moment(doc.date);
        if(currDate.quarter()==date.quarter())
          return callback(err,doc);
      });
      return callback(err,null);
    });
  },
  getRankSchema:function(){
    return RanksCollection.Schema;
  }
};
module.exports=Leaderboard;
