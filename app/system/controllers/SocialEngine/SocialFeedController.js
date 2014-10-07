var SocialFeedModel=require('../../models/SocialFeed');
var SocialFeedController={
  getSocialFeedOfUser:function(req,res){
    SocialFeedModel.getSocialFeedOfUser(req.params.userId,{_id:0},{},req.query.limits,req.query.limits,req.query.offset,callback);
  }
};
module.exports=SocialFeedController;
