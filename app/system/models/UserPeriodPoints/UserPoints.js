var UserMonthPoints=require('./UserMonthPoints');
var UserQuarterPoints=require('./UserQuarterPoints');
var UserYearPoints=require('./UserYearPoints');

var UserPoints={
  UserMonthPoints:UserMonthPoints,
  UserQuarterPoints:UserQuarterPoints,
  UserYearPoints:UserYearPoints,
  addPointsEverywhere:function(userId,time,pointsObj,callback){
    UserMonthPoints.addPointsObject(userId,time,pointsObj,function(){});
    // UserQuarterPoints.addPoints(userId,time,pointsObj.pointsEarned,function(){});
    // UserYearPoints.addPoints(userId,time,pointsObj.pointsEarned,function(){});
  }
};
module.exports=UserPoints;
