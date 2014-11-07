var ChallengesCollection=require('./ChallengesCollection.js');
var mongoose=require('mongoose');
var Challenges= {
  createChallengeOfOrganization:function(organizationId,data,callback){
      data.orgId=organizationId;
      data.createdAt=new Date();
      var l=new ChallengesCollection(data);
      l.save(callback);
  },
  getChallengeOfOrganization:function(orgId,id,fields,options,populationData,callback){
    ChallengesCollection.findOne({orgId:orgId,'challenges._id':id},{'challenges.$':1},options).populate(populationData).exec(function(err,obj){
      callback(err,obj.challenges[0]);
    });
  },
  getChallengesOfOrganization:function(orgId,fields,options,populationData,callback){
    ChallengesCollection.find({orgId:mongoose.Types.ObjectId(orgId)},fields,options).populate(populationData).exec(callback);
  },
  updateJobRoleOfOrganization:function(orgId,id,updateData,callback){
    var temp={};
    temp["challenges.$"]=updateData;
    ChallengesCollection.update({orgId:orgId},{$set:temp},{multi:true},callback);
  },
  deleteJobRoleOfOrganization:function(orgId,id,callback){
    ChallengesCollection.update({orgId:orgId},{pull:{challenges:{_id:id}}},{multi:true},callback);
  }
};
module.exports=Challenges;
