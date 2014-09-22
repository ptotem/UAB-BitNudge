var StoresCollection=require('./StoresCollection.js');
var mongoose=require('mongoose');
var Stores={
  createStore:function(organizationId,data,callback){
    data.createdAt=new Date();
    data.orgId=mongoose.Types.ObjectId(organizationId);
    var l=new StoresCollection(data);
    l.save(callback);
    return true;
  },
  getStore:function(id,fields,options,populationData,callback){
    StoresCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getStoresOfOrganization:function(orgId,fields,options,populationData,callback){
    if(populationData)
      StoresCollection.find({orgId:orgId},fields,options).populate(populationData).exec(callback);
    else
      StoresCollection.find({orgId:orgId},fields,options).exec(callback);
  },
  getStoresOfTeam:function(teamId,fields,options,populationData,callback){
    StoresCollection.find({teamId:teamId},fields,options).populate(populationData).exec(callback);
  },
  removeStoreItemFromAllStores:function(storeItemId,callback){
    StoresCollection.update({},{$pull:{items:storeItemId}},callback);
  },
  getStoreSchema:function(){
    return StoresCollection.Schema;
  },
  deleteStore:function(id,callback){
    StoresCollection.remove({_id:id},callback);
  },
  updateStore:function(id,updateData,callback){
    StoresCollection.update({_id:id},{$set:updateData},callback);
  }
};
module.exports=Stores;
