var UserQuarterPointsCollection=require('./UserQuarterPointsCollection.js');

var UserQuarterPoints= {
  getUserQuarterPointsOfQuarter:function(userId,month,callback){
    UserQuarterPointsCollection.findOne({userId:userId},fields,options,callback);
  }
  // getAllSortedUserQuarterPointsOfQuarter:function(month,callback){
  //   UserQuarterPointsCollection.find({$where:"this.date.getMonth()=="+month.getMonth()+"&&this.date.getYear()=="+month.getYear()}).sort("totalPoints").exec(callback);
  // },
  // getSomeSortedUserQuarterPointsOfMonth:function(queryObj,month,callback){
  //   queryObj['$where']="this.date.getMonth()=="+month.getMonth()+"&&this.date.getYear()=="+month.getYear();
  //   UserQuarterPointsCollection.find(queryObj).sort("totalPoints").exec(callback);
  // }

};
module.exports=UserQuarterPoints;