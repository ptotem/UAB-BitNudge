var StoreItemsCollection=require('./StoreItemCollection.js');
// var Store=require('../Store');
var UserModel=require('../Users');
var mongoose=require('mongoose');
var StoreItems={
  createStoreItem:function(organizationId,data,callback){
    data.createdAt=new Date();
    data.orgId=mongoose.Types.ObjectId(organizationId);
    var l=new StoreItemsCollection(data);
    l.save(callback);
  },
  getStoreItem:function(storeId,fields,options,populationData,callback){
    StoreItemsCollection.findOne({_id:storeId},fields,options,callback);
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
  updateStoreItem:function(id,updateData,callback){
    StoreItemsCollection.update({_id:id},{$set:updateData},callback);
  },
  getStoreItemCost:function(id,callback){
    StoreItemsCollection.findOne(({_id:id}).cost,callback);
  },
  getStoreItemsOfOrganization:function(orgId,fields,options,populationData,callback){
    StoreItemsCollection.find({orgId:orgId},fields,options,callback);
  }
};
module.exports=StoreItems;
