var StoreItemsCollection=require('./StoreItemCollection.js');
var Store=require('../Store');
var StoreItems={
  initialize:function(server){
    console.log("StoreItems initialized");
  },
  createStoreItemOfStore:function(storeId,data){
    data.storeId=storeId;
    var l=new StoreItemsCollection(data);
    l.save();
    Store.addItemToStore(storeId);
    return true;
  },
  getStoreItem:function(id,callback){
    StoreItemsCollection.findOne({_id:id},callback);
  },
  getStoreItemsOfStore:function(storeId,callback){
    StoreItemsCollection.find({storeId:storeId},callback);
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
  buyItem:function(userId,itemId,callback){
  },
  updateStoreItem:function(id,fieldName,value,callback){
    var temp={};
    temp[fieldName]=value;
    StoreItemsCollection.update({_id:id},{$set:temp},callback);
  }
};
module.exports=StoreItems;
