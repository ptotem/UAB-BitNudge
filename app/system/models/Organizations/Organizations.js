var OrganizationsCollection=require('./OrganizationsCollection.js');
var mongoose=require('mongoose');

var Organization= {
    getOrganizationDetail:function(org,fields,callback){
        OrganizationsCollection.findOne(({'_id' :org},fields),callback);
    },
    getOrganizationSchema:function(){
        return OrganizationsCollection;
    },
    createOrganization:function(data,callback){
        data.createdAt=new Date();
        var org=new OrganizationsCollection(data);
        org.save(callback);
    },
    deleteOrganization:function(id,callback){
        OrganizationsCollection.remove({'_id':id},callback);
    },
    getOrganization:function(id,fields,options,populationData,callback){
        OrganizationsCollection.findOne({_id:id},fields,options,callback);
    },
    getAllOrganizations:function(fields,options,populationData,callback){
      OrganizationsCollection.find({},fields,options).populate(populationData).exec(callback);
    },
    updateOrganization:function(id,updateData,callback){
      OrganizationsCollection.update({_id:id},{$set:updateData},callback);
    }
};
module.exports=Organization;
