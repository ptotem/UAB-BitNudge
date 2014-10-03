var UserPointsCollection=require('./UserPointsCollection.js');

var UserPoints= {
  getUserPointsOfMonth:function(userId,month,callback){
    UserPointsCollection.findOne({userId:userId},fields,options,callback);
  },
  getAllSortedUserPointsOfMonth:function(month,callback){
    UserPointsCollection.find({$where:"this.date.getMonth()=="+month.getMonth()+"&&this.date.getYear()=="+month.getYear()}).sort("totalPoints").exec(callback);
  },
  getSomeSortedUserPointsOfMonth:function(queryObj,month,callback){
    queryObj['$where']="this.date.getMonth()=="+month.getMonth()+"&&this.date.getYear()=="+month.getYear();
    UserPointsCollection.find(queryObj).sort("totalPoints").exec(callback);
  }

};
module.exports=UserPoints;
