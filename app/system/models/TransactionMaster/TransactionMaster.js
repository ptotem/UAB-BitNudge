var TransactionMasterCollection=require('./TransactionMasterCollection.js');
var mongoose=require('mongoose');
var TransactionMaster={
  createTransactionMaster:function(orgId,data){
    data.orgId=mongoose.Types.ObjectId(orgId);
    data.createdAt=new Date();
    var l=new TransactionMasterCollection(data);
    l.save();
    return true;
  },
  getTransactionMaster:function(id,fields,options,populationData,callback){
    TransactionMasterCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  }
  // getAllTransactionMastersOfOrganization:function(orgId,callback){
  //   TransactionMasterCollection.find({_id:id},callback);
  // }
};
module.export=TransactionMaster;
