var OrganizationsCollection=require('./OrganizationsCollection.js');

var Organization= {
    initialize: function (server) {
        console.log("Organization initialized");
    },
    getOrganizationDetail:function(org,fieldName){
        OrganizationsCollection.find(({'_id' :org}).fieldName,callback);
    },
    getOrganizationSchema:function(){
        return OrganizationsCollection.Schema;
    },
    createOrganization:function(data){
        var org=new OrganizationsCollection(data);
        org.created_at=new Date();
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
        temp.created_at=new Date();
        temp[fieldName]=value;
        OrganizationsCollection.update({_id:id},{$set:temp},callback);
    },
//    addStoresToOrganizations:function(orgId,storeData,callback){
//        OrganizationsCollection.update({_id:orgId},{$push:storeData},callback);
//    }
    findRevenueDetailsOfOrg:function(id,fieldname,calback)
    {
        var field=fieldname;
      OrganizationsCollection.findOne({ '_id': id })
          .populate('revenue').exec(function (err, revenues) {
              if (err) return handleError(err);
              console.log('The creator is %s', revenues.revenue.field);
              return revenues.revenue.field;
          })
    },
    handleError:function(err){
       return true;

    }
};

module.exports=Organization;
//.findOne({ title: 'Once upon a timex.' })
//    .populate('_creator')
//    .exec(function (err, story) {
//        if (err) return handleError(err);
//        console.log('The creator is %s', story._creator.name);
//        // prints "The creator is Aaron"
//    })
