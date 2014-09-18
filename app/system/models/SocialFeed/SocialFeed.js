var SocialFeedCollection=require('./SocialFeedCollection.js');
var mongoose=require('mongoose');
var SocialFeed={
  createSocialFeed:function(orgId,data){
    data.orgId=mongoose.Types.ObjectId(orgId);
    data.createdAt=new Date();
    var l=new SocialFeedCollection(data);
    l.save();
    return true;
  },
  getSocialFeed:function(id,fields,options,populationData,callback){
    SocialFeedCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getSocialFeedOfUser:function(userId,fields,options,populationParams,callback){
    SocialFeedCollection.find({userId:userId},fields,options).populate(populationParams).exec(callback);
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