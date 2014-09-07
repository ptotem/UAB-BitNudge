var OrganizationsCollection=require('./OrganizationsCollection.js');

var Organization= {
    initialize: function (server) {
        console.log("Organization initialized");
    },
    getOrganizationDetail:function(org,fieldName){
        OrganizationsCollection.find({'_id' :org},callback).fieldName;
    },
    getOrganizationSchema:function(){
        return OrganizationsCollection.Schema;
    },
    createOrganization:function(data){
        var org=new OrganizationsCollection(data);
        org.save();
        return true;
    },
    deleteOrganization:function(id,callback){
        OrganizationsCollection.remove({'_id':id},callback);
    },
    getOrganization:function(id,callback){
        OrganizationsCollection.findOne({_id:id},callback);
    },
    setOrganizationFieldById:function(id,fieldName,value,callback){
        OrganizationsCollection.update({_id:id},{$set:{fieldName:value}},callback);
    },
    updateOrg:function(id,fieldName,value,callback){
        var temp={};
        temp[fieldName]=value;
        OrganizationsCollection.update({_id:id},{$set:temp},callback);
    },
    addStoresToOrganizations:function(orgId,storeData,callback){
        OrganizationsCollection.update({_id:orgId},{$push:storeData},callback);
    }
}
module.exports=Organization;
