var MedalsCollection=require('./MedalsCollection.js');
var mongoose=require('mongoose');
var Medals={
  createMedal:function(organizationId,data,callback){
    data.orgId=mongoose.Types.ObjectId(organizationId);
    data.createdAt=new Date();
    var l=new MedalsCollection(data);
    l.save(callback);
  },
  getMedal:function(id,fields,options,populationData,callback){
      if(populationData)
          MedalsCollection.find({_id:id},fields,options).populate(populationData).exec(callback);
      else
          MedalsCollection.find({_id:id},fields,options).exec(callback);
//    MedalsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getMedalsOfOrganization:function(orgId,fields,options,populationData,limit,offset,callback){
      if(populationData)
          MedalsCollection.find({orgId: orgId}).skip(parseInt(offset)).populate(populationData).limit(limit).exec(callback);
//          MedalsCollection.find({orgId:orgId},fields,options).populate(populationData).exec(callback);
      else
          MedalsCollection.find({orgId:orgId},fields,options).exec(callback);
//    MedalsCollection.find({orgId:orgId},fields,options).populate(populationData).exec(callback);
  },
  getMedalSchema:function(){
    return MedalsCollection.Schema;
  },
  updateMedal:function(id,updateData,callback){
    MedalsCollection.update({_id:id},{$set:updateData},callback);
  }
};
module.exports=Medals;
