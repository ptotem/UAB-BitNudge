var TeamPointsCollection=require('./TeamQuarterPointsCollection.js');

var TeamPoints= {
  getTeamPointsOfQuarter:function(teamId,quarter,fields,options,populationData,callback){
    var currDate=moment(quarter);
    var start=moment().quarter(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().quarter(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
    TeamPointsCollection.findOne({$gte:start,$lt:end,teamId:teamId},fields,options).populate(populationData).exec(callback);
  },
  getAllSortedTeamPointsOfQuarter:function(teamId,month,callback){
    var currDate=moment(quarter);
    var start=moment().quarter(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().quarter(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
    TeamPointsCollection.find({$gte:start,$lt:end,teamId:teamId}).sort("-totalPoints").exec(callback);
  },
  createTeamQuarterPoints:function(orgId, data){
    data.orgId=mongoose.Schema.Types.ObjectId(orgId);
    data.quarter=new Date();
    var user= new TeamQuarterPointsCollection(data);
    user.save();
  },
  updateTeamQuarterPoints:function(teamId,quarter,updateData,callback){
    var currDate=moment(quarter);
    var start=moment().quarter(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().quarter(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
    TeamQuarterPointsCollection.update({teamId:teamId,quarter:{$gte:start,$lt:end}},updateData,callback);
  },
  addPointsObject:function(teamId,quarter,pointsObj,callback){
    var currDate=moment(quarter);
    var start=moment().quarter(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().quarter(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
    TeamQuarterPointsCollection.update({teamId:teamId,quarter:{$gte:start,$lt:end}},{$push:{points:pointsObj}},callback);
  }

};
module.exports=TeamPoints;
