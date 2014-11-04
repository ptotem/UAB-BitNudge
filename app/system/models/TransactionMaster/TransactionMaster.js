var TransactionMasterCollection=require('./TransactionMasterCollection.js');
var mongoose=require('mongoose');
var TransactionMaster={
<<<<<<< HEAD
  createTransactionMaster:function(orgId,data){
    data.orgId=mongoose.Types.ObjectId(orgId);
    data.createdAt=new Date();
    var l=new TransactionMasterCollection(data);
    l.save();
=======
  createTransactionMaster:function(orgId,data,callback){
    data.orgId=mongoose.Types.ObjectId(orgId);
    data.createdAt=new Date();
    var l=new TransactionMasterCollection(data);
    l.save(callback);
>>>>>>> eaf3c3277e793f12e4116680da3ebe50ed3c788b
  },
  getAllTransactionMasters:function(fields,options,populationData,callback){
    TransactionMasterCollection.find({type:{$ne:"System Activity"}},fields,options).populate(populationData).exec(callback);
  },
  getTransactionMaster:function(id,fields,options,populationData,callback){
    TransactionMasterCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  }
  // getAllTransactionMastersOfOrganization:function(orgId,callback){
  //   TransactionMasterCollection.find({_id:id},callback);
  // }
};
module.exports=TransactionMaster;
