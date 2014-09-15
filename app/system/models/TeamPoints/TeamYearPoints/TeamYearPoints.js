var TeamYearPointsCollection=require('./TeamYearPointsCollection.js');

var TeamYearPoints= {
  getTeamYearPointsOfYear:function(teamId,year,callback){
    var currDate=moment(year);
    var start=moment().year(moment(year)).month(0).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().year(moment(year)+1).month(0).date(1).hour(0).minute(0).second(0).toDate();
    TeamPointsCollection.findOne({year:{$gte:start,$lt:end},teamId:teamId},fields,options,callback);
  },
  getSortedTeamYearPointsOfYear:function(teamId,queryObj,year,callback){
    var currDate=moment(year);
    var start=moment().year(moment(year)).month(0).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().year(moment(year)+1).month(0).date(1).hour(0).minute(0).second(0).toDate();
    queryObj.year={year:{$gte:start,$lt:end}};
    queryObj.teamId=teamId;
    TeamYearPointsCollection.find(queryObj).sort("totalPoints").exec(callback);
  },
  createTeamYearPoints:function(orgId, data){
    data.orgId=mongoose.Schema.Types.ObjectId(orgId);
    data.year=new Date();
    var user= new TeamYearPointsCollection(data);
    user.save();
  },
  updateTeamYearPoints:function(teamId,year,updateData,callback){
    var currDate=moment(year);
    var start=moment().year(moment(year)).month(0).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().year(moment(year)+1).month(0).date(1).hour(0).minute(0).second(0).toDate();
    TeamYearPointsCollection.update({teamId:teamId,year:{$gte:start,$lt:end}},updateData,callback);
  },
  addPointsObject:function(teamId,year,pointsObj,callback){
    var currDate=moment(year);
    var start=moment().year(moment(year)).month(0).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().year(moment(year)+1).month(0).date(1).hour(0).minute(0).second(0).toDate();
    TeamYearPointsCollection.update({teamId:teamId,year:{$gte:start,$lt:end}},{$push:{points:pointsObj}},callback);
  }

};
module.exports=TeamYearPoints;
