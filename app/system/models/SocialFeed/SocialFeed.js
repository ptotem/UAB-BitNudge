var SocialFeedCollection=require('./SocialFeedCollection.js');
var SocialFeed={
  createSocialFeed:function(organizationId,data){
    data.orgId=organizationId;
    data.createdAt=new Date();
    var l=new SocialFeedCollection(data);
    l.save();
    return true;
  },
  getSocialFeed:function(id,fields,options,populationData,callback){
    SocialFeedCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getSocialFeedOfUser:function(userId,fields,options,populationParams,callback){
    if(populationData)
      SocialFeedCollection.find({userId:userId},fields,options).populate(populationParams).exec(callback);
    else 
      SocialFeedCollection.find({userId:userId},fields,options).exec(callback);
  },
  addMessageToFeed:function(userId,messageId,callback){
    SocialFeedCollection.update({userId:userId},{$push:{messages:messageId}},callback);
  },
  getSocialFeedSchema:function(){
    return SocialFeedCollection.Schema;
  },
  deleteSocialFeed:function(id,callback){
    SocialFeedCollection.remove({_id:id},callback);
  },
  updateSocialFeed:function(id,updateData,callback){
    SocialFeedCollection.update({_id:id},{$set:updateData},callback);
  }
};
module.exports=SocialFeed;
