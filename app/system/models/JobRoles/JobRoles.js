var JobRolesCollection=require('./JobRolesCollection.js');
var mongoose=require('mongoose');
var JobRoles= {
  createJobRole:function(organizationId,data,callback){
    data.createdAt=new Date();
    JobRolesCollection.findOne({orgId:organizationId},"","").exec(function(err,docExists){
      if(err) callback(err);
      if(docExists)
        JobRolesCollection.update({orgId:organizationId},{$addToSet:{jobRoles:data}},callback);
      else{
        var l=new JobRolesCollection({orgId:organizationId,jobRoles:[data]});
        l.save(callback);
      }
    });
  },
  getJobRoleOfOrganization:function(orgId,id,fields,options,populationData,callback){
    JobRolesCollection.findOne({orgId:orgId,'jobRoles._id':id},fields,options).populate(populationData).exec(function(err,obj){
      callback(err,obj.jobRoles[0]);
    });
  },
  getJobRolesOfOrganization:function(orgId,fields,options,populationData,callback){
    console.log(orgId);
      JobRolesCollection.find({orgId:mongoose.Types.ObjectId(orgId)},fields,options).populate(populationData).exec(callback);
  },
  updateJobRoleOfOrganization:function(orgId,id,updateData,callback){
    var temp={};
    temp["jobRoles.$"]=updateData;
    JobRolesCollection.update({orgId:orgId},{$set:temp},{multi:true},callback);
  },
  deleteJobRoleOfOrganization:function(orgId,id,callback){
    JobRolesCollection.update({orgId:orgId},{pull:{jobRoles:{_id:id}}},{multi:true},callback);
  }
};
module.exports=JobRoles;
