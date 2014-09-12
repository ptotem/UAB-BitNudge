var UserMonthPointsCollection=require('./UserMonthPointsCollection.js');
var mongoose=require('mongoose');

var UserMonthPoints= {
  getUserMonthPointsOfMonth:function(userId,month,callback){
    UserMonthPointsCollection.findOne({userId:userId},fields,options,callback);
  },
  getAllSortedUserPointsOfMonth:function(month,callback){
    UserMonthPointsCollection.find({/*$where:"this.month.getMonth()=="+month.getMonth()+"&&this.month.getYear()=="+month.getYear()*/}).sort("totalPoints").exec(callback);
  },
  getSomeSortedUserMonthPointsOfMonth:function(queryObj,month,callback){
    queryObj['$where']="this.date.getMonth()=="+month.getMonth()+"&&this.date.getYear()=="+month.getYear();
    UserMonthPointsCollection.find(queryObj).sort("totalPoints").exec(callback);
  },
  createUserMonthPoints:function(orgId, data){
    data.orgId=mongoose.Schema.Types.ObjectId(orgId);
    var user= new UserMonthPointsCollection(data);
    user.save();
  }

};
module.exports=UserMonthPoints;
