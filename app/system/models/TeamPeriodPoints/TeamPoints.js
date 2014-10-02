var TeamMonthPoints=require('./TeamMonthPoints');
var TeamQuarterPoints=require('./TeamQuarterPoints');
var TeamYearPoints=require('./TeamYearPoints');

var TeamPoints={
  TeamMonthPoints:TeamMonthPoints,
  TeamQuarterPoints:TeamQuarterPoints,
  TeamYearPoints:TeamYearPoints,
  addPointsEverywhere:function(userId,time,pointsObj,callback){
    TeamMonthPoints.addPointsObject(obj.userId,new Date(),{pointsEarned:goalObj.points,type:"goals",from:goalObj._id},function(){});
    TeamQuarterPoints.addPoints(obj.userId,new Date(),goalObj.points,function(){});
    TeamYearPoints.addPoints(obj.userId,new Date(),goalObj.points,function(){});
  }
};
module.exports=TeamPoints;
