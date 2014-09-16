var StoresCollection=require('./StoresCollection.js');
var Stores={
  createStore:function(organizationId,data){
    data.createdAt=new Date();
    data.organizationId=organizationId;
    var l=new StoresCollection(data);
    l.save();
    return true;
  },
  getStore:function(id,fields,options,populationData,callback){
    StoresCollection.findOne({_id:id},fields,options,populationData,callback);
  },
  // getStoresOfOrganization(orgId,callback){
  //   StoresCollection.find({organizationId:orgId},callback);
  // },
  getStoresOfTeam:function(teamId,fields,options,populationData,callback){
    StoresCollection.find({teamId:teamId},fields,options,populationData,callback);
  },
  addItemToStore:function(storeId,itemData,callback){
    StoresCollection.update({_id:storeId},{$set:itemData},callback);
  },
  getStoreSchema:function(){
    return StoresCollection.Schema;
  },
  deleteStore:function(id,callback){
    StoresCollection.remove({_id:id},callback);
  },
  updateStore:function(id,updateDate,callback){
    StoresCollection.update({_id:id},{$set:updateData},callback);
  }
}
module.exports=Stores;
