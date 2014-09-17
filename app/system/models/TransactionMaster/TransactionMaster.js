var TransactionMasterCollection=require('./TransactionMasterCollection.js');

var TransactionMaster={
  createTransactionMaster:function(organizationId,data){
    data.orgId=organizationId;
    data.createdAt=new Date();
    var l=new TransactionMasterCollection(data);
    l.save();
    return true;
  },
  getTransactionMaster:function(id,fields,options,populationData,callback){
    TransactionMasterCollection.findOne({_id:id},fields,options,callback);
  }
  // getAllTransactionMastersOfOrganization:function(orgId,callback){
  //   TransactionMasterCollection.find({_id:id},callback);
  // }
};
module.export=TransactionMaster;
