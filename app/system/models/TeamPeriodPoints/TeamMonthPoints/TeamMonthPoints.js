var TeamMonthPointsCollection=require('./TeamMonthPointsCollection.js');
var moment=require('moment');

var TeamMonthPoints= {
  getTeamPointsOfMonth:function(teamId,month,fields,options,populationData,callback){
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    TeamMonthPointsCollection.findOne({teamId:teamId,month:{$gte:start,$lt:end}},fields,options).populate(populationData).exec(callback);
  },
  getSortedTeamPointsOfMonth:function(teamId,month,callback){
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    TeamMonthPointsCollection.find({month:{$gte:start,$lt:end},teamId:teamId}).sort("-totalPoints").exec(callback);
  },
  createTeamPoints:function(orgId,data){
    data.orgId=mongoose.Schema.Types.ObjectId(orgId);
    data.month=new Date();
    data.createdAt=new Date();
    var temp=TeamMonthPointsCollection(data);
    temp.save();
  },
  updateTeamMonthPoints:function(teamId,month,updateData,callback){
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    TeamMonthPointsCollection.update({teamId:teamId,month:{$gte:start,$lt:end}},updateData,callback);
  },
  addPointsObject:function(teamId,month,pointsObj,callback){
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    TeamMonthPointsCollection.update({teamId:teamId,month:{$gte:start,$lt:end}},{$push:{points:pointsObj}},callback);
  }

};
module.exports=TeamMonthPoints;
