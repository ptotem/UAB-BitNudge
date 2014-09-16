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
        return true;
    },
    deleteOrganization:function(id,callback){
        OrganizationsCollection.remove({'_id':id},callback);
    },
    getOrganization:function(id,fields,options,populationData,callback){
        OrganizationsCollection.findOne({_id:mongoose.Types.ObjectId(id)},fields,options).exec(callback);
    },
    setOrganizationFieldById:function(id,fieldName,value,callback){
        OrganizationsCollection.update({_id:mongoose.Types.ObjectId(id)},{$set:{fieldName:value}},callback);
    },
    updateOrg:function(id,updatedData,callback){
        OrganizationsCollection.update({_id:id},{$set:updatedData},callback);
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
