var UserMonthPointsCollection=require('./UserMonthPointsCollection.js');
var mongoose=require('mongoose');
var moment=require('moment');

var UserMonthPoints= {
  createUserMonthPoints:function(orgId, data){
    data.orgId=orgId;
    // data.orgId=mongoose.Schema.Types.ObjectId(orgId);
    data.month=new Date();
    var user= new UserMonthPointsCollection(data);
    user.save();
  },
  getUserMonthPointsOfMonth:function(userId,month,callback){
    UserMonthPointsCollection.findOne({userId:userId},fields,options,callback);
  },
  // getAllSortedUserPointsOfMonth:function(month,callback){
  //   var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
  //   var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
  //   UserMonthPointsCollection.find({month:{$gte:start,$lt:end}}).sort("totalPoints").exec(callback);
  // },
  getSortedUserPointsOfMonth:function(queryObj,month,callback){
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    // queryObj.userId=userId;
    // queryObj.month={$gte:start,$lt:end};
    UserMonthPointsCollection.find({}).sort("-totalPoints").exec(callback);
  },
  updateUserMonthPoints:function(userId,month,updateData,callback){
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    UserMonthPointsCollection.update({userId:userId,month:{$gte:start,$lt:end}},updateData,callback);
  },
  addPointsObject:function(userId,month,pointsObj,callback){
    var start=moment().month(month.getMonth()).date(1).hour(0).minute(0).second(0).toDate();
    var end=moment().month(month.getMonth()+1).date(1).hour(0).minute(0).second(0).toDate();
    UserMonthPointsCollection.update({userId:userId,month:{$gte:start,$lt:end}},{$push:{points:pointsObj},$inc:{totalPoints:pointsObj.pointsEarned}},callback);
  }

};
module.exports=UserMonthPoints;
