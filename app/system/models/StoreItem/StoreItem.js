var StoreItemsCollection=require('./StoreItemCollection.js');
var Store=require('../Store');
var mongoose=require('mongoose');
var StoreItems={
  createStoreItem:function(organizationId,data,callback){
    data.createdAt=new Date();
    data.orgId=mongoose.Types.ObjectId(organizationId);
    var l=new StoreItemsCollection(data);
    l.save(callback);
  },
  getStoreItem:function(storeId,fields,options,populationData,callback){
    StoreItemsCollection.findOne({_id:storeId},fields,options).populate(populationData).exec(callback);
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
  getStoreItemsOfOrganization:function(orgId,fields,options,populationData,limit,offset,callback){

//    StoreItemsCollection.find({orgId:orgId},fields,options).populate(populationData).exec(callback);
      if(options)
          StoreItemsCollection.find({orgId: orgId}).skip(parseInt(offset)).populate(populationData).limit(limit).exec(callback);
//      StoresCollection.find({orgId:orgId},fields,options).populate(populationData).exec(callback);
      else
          StoreItemsCollection.find({orgId:orgId},fields,options).populate(populationData).exec(callback);
  }
};
module.exports=StoreItems;
