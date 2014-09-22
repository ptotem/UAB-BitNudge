var SocialFeedCollection=require('./SocialFeedCollection.js');
var mongoose=require('mongoose');

var SocialFeed={
  createSocialFeed:function(organizationId,userId,data,callback){
    data.orgId=mongoose.Types.ObjectId(organizationId);
    data.createdAt=new Date();
    data.userId=mongoose.Types.ObjectId(userId);
    var l=new SocialFeedCollection(data);
    l.save(callback);
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
  deleteSocialFeed:function(userId,callback){
    SocialFeedCollection.remove({userId:userId},callback);
  },
  updateSocialFeed:function(id,updateData,callback){
    SocialFeedCollection.update({_id:id},{$set:updateData},callback);
  }
};
module.exports=SocialFeed;
