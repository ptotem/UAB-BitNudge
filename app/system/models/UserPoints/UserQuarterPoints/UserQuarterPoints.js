var UserQuarterPointsCollection=require('./UserQuarterPointsCollection.js');

var UserQuarterPoints= {
  createUserQuarterPoints:function(orgId, data){
    data.orgId=mongoose.Schema.Types.ObjectId(orgId);
    data.quarter=new Date();
    var user= new UserQuarterPointsCollection(data);
    user.save();
  },
  getUserQuarterPointsOfQuarter:function(userId,fields,options,populationData,callback){
    var currDate=moment(quarter);
    var start=moment().quarter(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().quarter(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
    UserQuarterPointsCollection.find({quarter:{$gte:start,$lt:end},userId:userId},fields,options).populate(populationData).exec(callback);
  },
  // getAllSortedUserPointsOfQuarter:function(quarter,callback){
  //   var currDate=moment(quarter);
  //   var start=moment().quarter(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
  //   var end=moment().quarter(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
  //   UserQuarterPointsCollection.find({quarter:{$gte:start,$lt:end}}).sort("totalPoints").exec(callback);
  // },
  getSortedUserPointsOfQuarter:function(queryObj,quarter,callback){
    var currDate=moment(quarter);
    var start=moment().quarter(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().quarter(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
    queryObj.quarter={$gte:start,$lt:end};
    UserQuarterPointsCollection.find(queryObj).sort("-totalPoints").exec(callback);
  },
  updateUserQuarterPoints:function(userId,quarter,updateData,callback){
    var currDate=moment(quarter);
    var start=moment().quarter(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().quarter(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
    UserQuarterPointsCollection.update({userId:userId,quarter:{$gte:start,$lt:end}},updateData,callback);
  },
  addPointsObject:function(userId,quarter,pointsObj,callback){
    var currDate=moment(quarter);
    var start=moment().quarter(0).quarter(currDate.quarter()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().quarter(0).quarter(currDate.quarter()+1).date(1).hour(0).minute(0).second(0).toDate();
    UserQuarterPointsCollection.update({userId:userId,quarter:{$gte:start,$lt:end}},{$push:{points:pointsObj}},callback);
  }
};
module.exports=UserQuarterPoints;
