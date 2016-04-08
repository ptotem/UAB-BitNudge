var TagsCollection=require('./TagsCollection.js');
var mongoose=require('mongoose');
var Tag= {
  createTag:function(organizationId,data,callback){
      data.orgId=organizationId;
      data.createdAt=new Date();
      var l=new TagsCollection(data);
      l.save(callback);
  },
  getTag:function(id,fields,options,populationData,callback){
      TagsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getTagsOfTypeOfOrganization:function(orgId,type,fields,options,populationData,callback){
    console.log(orgId);
      TagsCollection.find({orgId:mongoose.Types.ObjectId(orgId),type:type},fields,options).populate(populationData).exec(callback);
  },
  updateTag:function(id,updateData,callback){
    TagsCollection.update({_id:id},{$set:updateData},callback);
  },
  deleteTag:function(id,callback){
    TagsCollection.remove({_id:id},callback);
  }
};
module.exports=Tag;
