var SocialFeedModel=require('../../models/SocialFeed');
var SocialFeedController={
  getSocialFeedOfUser:function(req,res){
    SocialFeedModel.getSocialFeedOfUser(userId,{_id:0},{},null,callback);
  }
};
module.exports=SocialFeedController;
