var OrgTagsCollection=require('./OrgTagsCollection.js');
var mongoose=require('mongoose');
var OrgTag= {
  createOrgTag:function(organizationId,data,callback){
      data.orgId=organizationId;
      data.createdAt=new Date();
      var l=new OrgTagsCollection(data);
      l.save(callback);
  },
  getOrgTag:function(id,fields,options,populationData,callback){
    OrgTagsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getOrgTagsOfTypeOfOrganization:function(orgId,type,fields,options,populationData,callback){
    OrgTagsCollection.find({orgId:mongoose.Types.ObjectId(orgId),type:type},fields,options).populate(populationData).exec(callback);
  },
  updateOrgTag:function(id,updateData,callback){
    OrgTagsCollection.update({_id:id},{$set:updateData},callback);
  },
  deleteOrgTag:function(id,callback){
    OrgTagsCollection.remove({_id:id},callback);
  }
};
module.exports=OrgTag;
