var MedalsCollection=require('./MedalsCollection.js');
var mongoose=require('mongoose');
var Medals={
  createMedal:function(organizationId,data,callback){
    data.orgId=mongoose.Types.ObjectId(organizationId);
    data.createdAt=new Date();
    var l=new MedalsCollection(data);
    l.save(callback);
  },
  getMedal:function(id,callback){
    MedalsCollection.findOne({_id:id},callback);
  },
  getMedalsOfOrganization:function(orgId,callback){
    MedalsCollection.find({organizationId:orgId},callback);
  },
  getMedalSchema:function(){
    return MedalsCollection.Schema;
  },
  updateMedal:function(id,updateData,callback){
    MedalsCollection.update({_id:id},{$set:updateData},callback);
  }
};
module.exports=Medals;
