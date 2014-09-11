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
  // deleteMedal:function(id,callback){
  //   MedalsCollection.remove({_id:id},callback);
  // },
  updateMedal:function(id,fieldName,value,callback){
    var temp={};
    temp[fieldName]=value;
    MedalsCollection.update({_id:id},{$set:temp},callback);
  }
};
module.exports=Medals;
