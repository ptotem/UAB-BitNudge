var ChallengesCollection=require('./ChallengesCollection.js');
var mongoose=require('mongoose');
var Challenges= {
  createChallengeOfOrganization:function(organizationId,data,callback){
    data.createdAt=new Date();
    ChallengesCollection.findOne({orgId:organizationId},function(err,orgChallenges){
      if(err)callback(err);
      if(!orgChallenges){
        data.orgId=organizationId;
        var l=new ChallengesCollection({orgId:organizationId,createdAt:new Date(),challenges:[data]});
        l.save(callback);
      }
      else 
        ChallengesCollection.update({orgId:organizationId},{$push:{challenges:data}},callback);
    });
  },
  getChallengeOfOrganization:function(orgId,id,fields,options,populationData,callback){
    ChallengesCollection.findOne({orgId:orgId,'challenges._id':id},{'challenges.$':1},options).populate(populationData).exec(function(err,obj){
      callback(err,obj.challenges[0]);
    });
  },
  approveChallenge:function(orgId,challengeId,approver,callback){
    ChallengesCollection.update({orgId:orgId,'challenges._id':challengeId},{$set:{approved:true}},callback);
  },
  getChallengesOfOrganization:function(orgId,fields,options,populationData,callback){
    ChallengesCollection.find({orgId:mongoose.Types.ObjectId(orgId)},fields,options).populate(populationData).exec(callback);
  },
  updateChallengeOfOrganization:function(orgId,id,updateData,callback){
    var temp={};
    temp["challenges.$"]=updateData;
    ChallengesCollection.update({orgId:orgId},{$set:temp},{multi:true},callback);
  },
  deleteChallengeOfOrganization:function(orgId,id,callback){
    ChallengesCollection.update({orgId:orgId},{pull:{challenges:{_id:id}}},{multi:true},callback);
  }
};
module.exports=Challenges;
