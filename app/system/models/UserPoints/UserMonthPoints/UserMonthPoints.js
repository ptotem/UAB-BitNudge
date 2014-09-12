var UserMonthPointsCollection=require('./UserMonthPointsCollection.js');

var UserMonthPoints= {
  getUserMonthPointsOfMonth:function(userId,month,callback){
    UserMonthPointsCollection.findOne({userId:userId},fields,options,callback);
  },
  getAllSortedUserPointsOfMonth:function(month,callback){
    UserMonthPointsCollection.find({$where:"this.date.getMonth()=="+month.getMonth()+"&&this.date.getYear()=="+month.getYear()}).sort("totalPoints").exec(callback);
  },
  getSomeSortedUserMonthPointsOfMonth:function(queryObj,month,callback){
    queryObj['$where']="this.date.getMonth()=="+month.getMonth()+"&&this.date.getYear()=="+month.getYear();
    UserMonthPointsCollection.find(queryObj).sort("totalPoints").exec(callback);
  }

};
module.exports=UserMonthPoints;
