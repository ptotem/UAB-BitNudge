var MedalsCollection=require('./MedalsCollection.js');
var Medals={
  initialize:function(server){
    console.log("medals initialized");
  },
  createMedal:function(organizationId,data){
    data.organizationId=organizationId;
    data.createdAt=new Date();
    var l=new MedalsCollection(data);
    l.save();
    return true;
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
