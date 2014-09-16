var StoreItemsCollection=require('./StoreItemCollection.js');
var Store=require('../Store');
var UserModel=require('../Users');
var StoreItems={
  createStoreItem:function(organizationId,data){
    data.createdAt=new Date();
    data.organizationId=organizationId;
    var l=new StoreItemsCollection(data);
    l.save();
    return true;
  },
  getStoreItem:function(storeId,fields,options,populationData,callback){
    StoreItemsCollection.find({storeId:storeId},fields,options,callback);
  },
  getStoreItemSchema:function(){
    return StoreItemsCollection.Schema;
  },
  deleteStoreItem:function(id,callback){
    StoreItemsCollection.remove({_id:id},callback);
  },
  //this callback takes an argument which contains the boolean value, whether item available.
  isStoreItemAvailable:function(id,callback){
    StoreItemsCollection.findOne({_id:id},function(err,obj){
      if(err) callback(false);
      else callback(obj.quantity>0);
    });
  },
  updateStoreItem:function(id,updateDate,callback){
    StoreItemsCollection.update({_id:id},{$set:updateData},callback);
  },
  updateStoreItem:function(id,fieldName,value,callback){
    var temp={};
    temp[fieldName]=value;
    StoreItemsCollection.update({_id:id},{$set:temp},callback);
  },
    getStoreItemCost:function(id,callback){
        StoreItemsCollection.findOne(({_id:id}).cost,callback);

  },
  getStoresOfOrg:function(orgId,fields,options,callback){
    StoresCollection.findOne({organizationId:orgId},fields,options,function(err,obj){
      if(err) handleError(err);
      return callback(err,obj.name);
    });
  }
};
module.exports=StoreItems;
