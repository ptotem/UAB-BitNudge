var StoreCollection=require('./StoreCollection.js');
var Stores={
  initialize:function(server){
    console.log("Stores initialized");
  },
  createStore:function(data){
    //do some validation to check if approp fields are supplied
    var l=new StoreCollection(data);
    l.save();
    return true;
  },
  getStore:function(id,callback){
    StoreCollection.findOne({_id:id},callback);
  },
  getStoresOfOrganization(orgId,callback){
    StoreCollection.find({organizationId:orgId},callback);
  },
  getStoresOfTeam:function(teamId,callback){
    StoreCollection.find({teamId:teamId},callback);
  },
  addItemToStore:function(storeId,itemData,callback){
    StoreCollection.update({_id:storeId},{$set:itemData},callback);
  },
  getStoreSchema:function(){
    return StoreCollection.Schema;
  },
  deleteStore:function(id,callback){
    StoreCollection.remove({_id:id},callback);
  },
  updateStore:function(id,fieldName,value,callback){
    var temp={};
    temp[fieldName]=value;
    StoreCollection.update({_id:id},{$set:temp},callback);
  }
};
module.exports=Stores;
