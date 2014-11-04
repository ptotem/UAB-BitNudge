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
        var org=new OrganizationsCollection(data);
        org.createdAt=new Date();
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
    setOrganizationFieldById:function(id,fieldName,value,callback){
        OrganizationsCollection.update({_id:id},{$set:{fieldName:value}},callback);
    },
    updateOrganization:function(id,updateData,callback){
      console.log(updateData);
        OrganizationsCollection.update({_id:id},{$set:updateData},callback);
    },
    findRevenueDetailsOfOrg:function(id,fieldname,calback)
    {
      var field=fieldname;
      OrganizationsCollection.findOne({ '_id': id })
          .populate('revenue').exec(function (err, revenues) {
              if (err) return handleError(err);
              console.log('The creator is %s', revenues.revenue.field);
              return revenues.revenue.field;
          });
    },
    handleError:function(err){
       return true;
    }
};
module.exports=Organization;
