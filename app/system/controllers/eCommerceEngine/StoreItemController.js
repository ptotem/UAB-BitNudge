var StoreItemModel=require('../../models/StoreItem');
var StoreModel=require('../../models/Store');
var UserModel=require('../../models/Users').Users;
var AuthorizationController=('../../controllers/AuthorizationController.js');

var StoreItemController={
    getStoreItemsOfOrganization:function(req,res){
      StoreItemModel.getStoreItemsOfOrganization(req.params.orgId,"",{ limit : req.query.limits ,skip :req.query.offset},"",function(err,obj){
        if(err) res.send(err);
        else res.send(obj);
      });
    },
    getStoreItemsOfStore:function(req,res){
      // StoreModel.getStore
    },
    getStoreItemsOfUser:function(req,res){
//        TransactionModel.getTransactionsOfUser(req.params.userId,"","","",req.params.limits,req.params.offset,function(err,obj){
//        TransactionModel.getTransactionsOfUser(req.params.userId,"",{  slice: {  limits: parseInt(req.query.limits), offset: parseInt(req.query.offset) }},"",function(err,obj){

                UserModel.getStoreItemsOfUser(req.params.userId,"",{  slice: {  limits: parseInt(req.query.limits), offset: parseInt(req.query.offset) }},"",function(err,obj){
//          console.log('hiii');
        if(err) res.send(err);
        else res.send(obj);
      });
    },
    getStoreItem:function(req,res){
      StoreItemModel.getStoreItem(req.params.storeId,"","","",function(err,obj){
        if(err) res.send(err);
        else res.send(obj);
      });
    },
    buyItemForUser:function(req,res){
      StoreItemModel.getStoreItem(req.body.item,{_id:0,cost:1},"","",function(err,item){
        if(err) return res.send("fail");

          UserModel.getTotalCash(req.params.userId,"","","",function(err,data)
          {
              if(data.totalCash >=item.cost)
              {
                  UserModel.buyItemForUser(req.params.userId,req.body.item,item.cost,function(err1,obj){
                      if(err1) res.send("fail");
                      else res.send("Success");
                  });
              }
              else
              {
                  res.send('In sufficient Balance');
              }
          });
      });
    },
    createStoreItem:function(req,res){
      StoreItemModel.createStoreItem(req.params.orgId,req.body,function(err,obj){
        if(err) res.send(err);
        else res.send(obj);
      });
    },
    updateStoreItem:function(req,res){
      StoreItemModel.updateStoreItem(req.params.storeItemId,req.body,function(err,obj){
        if(err) res.send(err);
        else res.send("success");
      });
    },
    deleteStoreItem:function(req,res){
      // StoreItemModel.deleteStoreItem(req.params.storeItemId,function(err,obj){
      StoreModel.removeStoreItemFromAllStores(req.params.storeItemId,function(err,obj){
        if(err) res.send(err);
        else res.send(obj);
      });
    }
};
module.exports=StoreItemController;
