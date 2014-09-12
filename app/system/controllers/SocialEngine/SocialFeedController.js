var SocialFeedModel=require('../../models/SocialFeed');
var SocialFeedController={
  getSocialFeedOfUser:function(userId,limit,callback){
    SocialFeedModel.getSocialFeedOfUser(userId,null,callback);
  }
};
module.exports=SocialFeedController;
