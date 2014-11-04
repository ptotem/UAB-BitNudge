var TeamPeriodPointsCollection=require('./TeamPeriodPointsCollection.js');
var moment=require('moment');
var mongoose=require('mongoose');

var TeamPoints={
  addPointsEverywhere:function(teamId,time,points,callback){
    TeamPoints.addToTeamPointsOfPeriod(userId,"month",time,points,function(){
      TeamPoints.addToTeamPointsOfPeriod(userId,"quarter",time,points,function(){
        TeamPoints.addToTeamPointsOfPeriod(userId,"year",time,points,callback);
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
  getTeamPointsOfPeriod:function(query,period,month,fields,options,populationData,callback){
    var periodQuery=TeamPoints.getQueryFromDate(period,date);
    TeamPeriodPointsCollection.aggregate({$match:query}, {$unwind:'$periods'}, {$match:periodQuery}, {$group:{_id:'$_id',teamId:{$last:'$teamId'},periods:{$push:'$periods'}}},callback);
  },
  createTeamPeriodPoints:function(orgId,teamId,data,callback){
    data.orgId=mongoose.Schema.Types.ObjectId(orgId);
    data.teamId=mongoose.Schema.Types.ObjectId(orgId);
    data.createdAt=new Date();
    var temp=new TeamPeriodPointsCollection(data);
    temp.save(callback);
  },
  setTeamPointsOfPeriod:function(teamId,period,date,points,callback){
    var temp={};
    temp.date=date;
    temp.period=period;
    temp['periods.$.totalPoints']=points;
    var query=TeamPoints.getQueryFromDate(period,date);
    query.teamId=teamId;
    TeamPeriodPointsCollection.update(query,{$set:temp},{upsert:true},callback);
  },
  addToTeamPointsOfPeriod:function(teamId,period,date,points,callback){
    var temp={};
    temp.date=date;
    temp.period=period;
    var incObj={};
    incObj['periods.$.totalPoints']=points;
    var query=TeamPoints.getQueryFromDate(period,date);
    query.teamId=teamId;
    TeamPeriodPointsCollection.update(query,{$set:temp,$inc:incObj},{upsert:true},callback);
  },
  // getTeamPointsOfPeriodOfOrganization:function(orgId,period,date,fields,options,populationData,callback){
  //   var periodQuery=TeamPoints.getQueryFromDate(period,date);
  //   var query={orgId:orgId};
  //   TeamPeriodPointsCollection.aggregate({$match:query}, {$unwind:'$periods'}, {$match:periodQuery}, {$group:{_id:'$_id',teamId:{$last:'$teamId'},periods:{$push:'$periods'}}},callback);
  // },
  getSortedTeamPointsOfPeriod:function(query,period,date,callback){
    var periodQuery=TeamPoints.getQueryFromDate(period,date);
    TeamPeriodPointsCollection.aggregate({$match:query}, {$unwind:'$periods'}, {$match:periodQuery}, {$group:{_id:'$_id',teamId:{$last:'$teamId'},periods:{$push:'$periods'}}},{$sort:{"periods.totalPoints":-1}},callback);
  }
};
module.exports=TeamPoints;
