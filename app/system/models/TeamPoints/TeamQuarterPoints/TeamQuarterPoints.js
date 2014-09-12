var TeamPointsCollection=require('./TeamQuarterPointsCollection.js');

var TeamPoints= {
  getTeamPointsOfMonth:function(userId,month,callback){
    TeamPointsCollection.findOne({userId:userId},fields,options,callback);
  },
  getAllSortedTeamPointsOfMonth:function(month,callback){
    TeamPointsCollection.find({$where:"this.date.getMonth()=="+month.getMonth()+"&&this.date.getYear()=="+month.getYear()}).sort("totalPoints").exec(callback);
  }

};
module.exports=TeamPoints;
