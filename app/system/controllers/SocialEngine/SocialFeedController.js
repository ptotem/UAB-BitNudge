var SocialFeedModel=require('../../models/SocialFeed');
var StatusMessageCollection=require('../../models/StatusMessages/StatusMessagesCollection.js');
var SocialFeedController={
  getSocialFeedOfOrganization:function(req,res){
    SocialFeedModel.getSocialFeedOfOrganization(req.params.orgId,{_id:0},{},{path:'messages',model:'statusMessages'},function(err,obj){
      StatusMessageCollection.populate(obj,[{path:"messages.userId",model:'users',select:"name"},{path:"messages.messages.userId",model:"users",select:"name"}],function(err1,obj1){
        if(err) res.send(err1);
        else res.send(obj1);
      });
    });
  }
};
module.exports=SocialFeedController;
