var UserPeriodPointsCollection=require('./UserPeriodPointsCollection.js');
var mongoose=require('mongoose');
var moment=require('moment');

var UserPoints={
  // UserMonthPoints:UserMonthPoints,
  // UserQuarterPoints:UserQuarterPoints,
  // UserYearPoints:UserYearPoints,
  addPointsEverywhere:function(userId,time,points,callback){
    UserPoints.addToUserPointsOfPeriod(userId,"month",time,points,function(){
      UserPoints.addToUserPointsOfPeriod(userId,"quarter",time,points,function(){
        UserPoints.addToUserPointsOfPeriod(userId,"year",time,points,callback);
      });
    });
  },
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
    else if(period=="year"){
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
    // data.userId=mongoose.Types.ObjectId(userId);
    data.orgId=mongoose.Types.ObjectId(orgId);
    data.userId=mongoose.Types.ObjectId(userId);
    data.createdAt=new Date();
    var user= new UserPeriodPointsCollection(data);
    user.save(callback);
  },
  setUserPointsOfPeriod:function(userId,period,date,points,callback){
    var temp={};
    temp['periods.$.totalPoints']=points;
    temp.date=date;
    temp.period=period;
    var query=UserPoints.getQueryFromDate(period,date);
    query.userId=userId;
    UserPeriodPointsCollection.update(query,{$set:temp},{upsert:true},callback);
  },
  addToUserPointsOfPeriod:function(userId,period,date,points,callback){
    var temp={};
    temp.date=date;
    temp.period=period;
    var incObj={};
    incObj['periods.$.totalPoints']=points;
    var query=UserPoints.getQueryFromDate(period,date);
    query.userId=userId;
    UserPeriodPointsCollection.update(query,{$set:temp,$inc:incObj},{upsert:true},callback);
  },
  getUserPointsOfPeriod:function(query,period,date,fields,options,populationData,callback){
    var periodQuery=UserPoints.getQueryFromDate(period,date);
    // var query={userId:userId};
    UserPeriodPointsCollection.aggregate({$match:query}, {$unwind:'$periods'}, {$match:periodQuery}, {$group:{_id:'$_id',userId:{$last:'$userId'},periods:{$push:'$periods'}}},callback);
  },
  getSortedUserPointsOfPeriod:function(query,period,date,callback){
    var periodQuery=UserPoints.getQueryFromDate(period,date);
    UserPeriodPointsCollection.aggregate({$match:query}, {$unwind:'$periods'}, {$match:periodQuery}, {$group:{_id:'$_id',userId:{$last:'$userId'},periods:{$push:'$periods'}}},{$sort:{"periods.totalPoints":-1}},callback);
  },
  // getUserPointsOfPeriodOfOrganization:function(orgId,period,date,fields,options,populationData,callback){
  //   var periodQuery=UserPoints.getQueryFromDate(period,date);
  //   var query={orgId:orgId};
  //   UserPeriodPointsCollection.aggregate({$match:query}, {$unwind:'$periods'}, {$match:periodQuery}, {$group:{_id:'$_id',userId:{$last:'$userId'},periods:{$push:'$periods'}}},callback);
  // }
};
module.exports=UserPoints;
