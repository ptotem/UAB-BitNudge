var StoresCollection=require('./StoresCollection.js');
var StoreRoutes=require('./StoreRoutes.js');
var Stores={
  initialize:function(server){
    //initializing routes.
    for(property in StoreRoutes)
    {
      methods=property.split(" ");
      eval("server."+methods[0]+"('"+methods[1]+"',"+StoreRoutes[property]+');');
    }
    console.log("Stores initialized");
  },
  createStore:function(organizationId,data){
    //do some validation to check if approp fields are supplied
    data.organizationId=organizationId;
    var l=new StoresCollection(data);
    l.save();
    return true;
  },
  getStore:function(id,callback){
    StoresCollection.findOne({_id:id},callback);
  },
<<<<<<< HEAD
  getStoresOfOrganization:function(orgId,callback){
    StoreCollection.find({organizationId:orgId},callback);
=======
  getStoresOfOrganization(orgId,callback){
    StoresCollection.find({organizationId:orgId},callback);
>>>>>>> 82e6261304b5f97c314aee0b52223f75c12a69fc
  },
  getStoresOfTeam:function(teamId,callback){
    StoresCollection.find({teamId:teamId},callback);
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
  updateStore:function(id,fieldName,value,callback){
    var temp={};
    temp[fieldName]=value;
    StoresCollection.update({_id:id},{$set:temp},callback);
  }

}
module.exports=Stores;
