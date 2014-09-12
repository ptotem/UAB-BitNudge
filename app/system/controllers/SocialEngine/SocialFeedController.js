var SocialFeedModel=require('../../models/SocialFeed');
var SocialFeedController={
  getSocialFeedOfUser:function(req,res){
    SocialFeedModel.getSocialFeedOfUser(userId,null,callback);
  }
};
module.exports=SocialFeedController;
