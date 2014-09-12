var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var SocialFeedSchema=new Schema({
  userId:Schema.Types.ObjectId,
  orgId:Schema.Types.ObjectId,
  messages:[{type:Schema.Types.ObjectId,ref:'statusMessages'}],
  createdAt:Date
});
var SocialFeedCollection=mongoose.model('socialFeed',SocialFeedSchema);
module.exports=SocialFeedCollection;
