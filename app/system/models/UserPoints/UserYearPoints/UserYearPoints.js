var UserPointsCollection=require('./UserYearPointsCollection.js');

var UserPoints= {
  getUserPointsOfYear:function(userId,year,fields,options,populationData,callback){
    var currDate=moment(year);
    var start=moment().year(moment(year)).month(0).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().year(moment(year)+1).month(0).date(1).hour(0).minute(0).second(0).toDate();
    UserPointsCollection.findOne({year:{$gte:start,$lt:end},userId:userId},fields,options).populate(populationData).exec(callback);
  },
  getSortedUserPointsOfYear:function(userId,queryObj,year,callback){
    var currDate=moment(year);
    var start=moment().year(moment(year)).month(0).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().year(moment(year)+1).month(0).date(1).hour(0).minute(0).second(0).toDate();
    queryObj.userId=userId;
    queryObj.year={year:{$gte:start,$lt:end}};
    UserPointsCollection.find(queryObj).sort("-totalPoints").exec(callback);
  },
  createUserYearPoints:function(orgId, data){
    data.orgId=mongoose.Schema.Types.ObjectId(orgId);
    data.year=new Date();
    var user= new UserYearPointsCollection(data);
    user.save();
  },
  updateUserYearPoints:function(userId,year,updateData,callback){
    var currDate=moment(year);
    var start=moment().year(moment(year)).month(0).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().year(moment(year)+1).month(0).date(1).hour(0).minute(0).second(0).toDate();
    UserYearPointsCollection.update({userId:userId,year:{$gte:start,$lt:end}},updateData,callback);
  },
  addPointsObject:function(userId,year,pointsObj,callback){
    var currDate=moment(year);
    var start=moment().year(moment(year)).month(0).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().year(moment(year)+1).month(0).date(1).hour(0).minute(0).second(0).toDate();
    UserYearPointsCollection.update({userId:userId,year:{$gte:start,$lt:end}},{$push:{points:pointsObj}},callback);
  }

};
module.exports=UserPoints;
