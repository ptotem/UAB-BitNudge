var UserPointsCollection=require('./UserPointsCollection.js');

var User_Point= {
    addPoints:function(user_id,data,callback){
        var points=new UserPointsCollection(data);
        points.userId
        points.created_at=new Date();
        points.save();
        return true;
    },

}
