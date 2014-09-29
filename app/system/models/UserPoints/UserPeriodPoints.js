var UserMonthPoints=require('./UserMonthPoints');
var UserQuarterPoints=require('./UserQuarterPoints');
var UserYearPoints=require('./UserYearPoints');
var UserPeriodPointsCollection=require('./UserPeriodPointsCollection.js');

var UserPoints={
  // UserMonthPoints:UserMonthPoints,
  // UserQuarterPoints:UserQuarterPoints,
  // UserYearPoints:UserYearPoints,
  // addPointsEverywhere:function(userId,time,pointsObj,callback){
  //   UserMonthPoints.addPointsObject(userId,time,pointsObj,function(){});
  //   // UserQuarterPoints.addPoints(userId,time,pointsObj.pointsEarned,function(){});
  //   // UserYearPoints.addPoints(userId,time,pointsObj.pointsEarned,function(){});
  // }
  getQueryFromDate:function(period,date){
    var currDate,start,end;
    if(period=="month"){
      currDate=moment(date);
      start=moment().month(currDate.month()).date(1).hour(0).minute(0).second(0).toDate();
      end=moment().month(currDate.month()+1).date(1).hour(0).minute(0).second(0).toDate();
    }
    else if(period=="quarter"){
      currDate=moment(date);
      start=moment().month(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
      end=moment().month(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
    }
    else if (period=="year"){
      currDate=moment(date);
      start=moment().year(currDate.year()).month(0).date(1).hour(0).minute(0).second(0).toDate();
      end=moment().year(currDate.year()+1).month(0).date(1).hour(0).minute(0).second(0).toDate();
    }
    var query={};
    query['periods.date']={$gte:start,$lt:end};
    query['periods.period']=period;
    return query;
  },
  createUserPeriodPoints:function(orgId,userId, data,callback){
    data.userId=mongoose.Types.ObjectId(userId);
    data.orgId=mongoose.Types.ObjectId(orgId);
    data.date=new Date();
    var user= new UserPeriodPointsCollection(data);
    user.save(callback);
  },
  setUserPointsOfPeriod:function(userId,period,date,points,callback){
    var temp={};
    temp['periods.$.totalPoints']=points;
    var query=Leaderboard.getQueryFromDate(period,date);
    query.userId=userId;
    UserPeriodPointsCollection.update(query,temp,callback);
  },
  getUserPointsOfPeriod:function(userId,fields,options,populationData,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    query.userId=userId;
    UserPeriodPointsCollection.find(query,fields,options).populate(populationData).exec(callback);
  },
  getUserMonthPointsOfPeriodOfOrganization:function(orgId,period,date,fields,options,populationData,callback){
    var query=Leaderboard.getQueryFromDate(period,date);
    query.orgId=orgId;
    UserPeriodPointsCollection.find(query,fields,options).populate(populationData).exec(callback);
  }
};
module.exports=UserPoints;
