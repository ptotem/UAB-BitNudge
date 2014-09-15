var StoreItemModel=require('../../models/StoreItem');
var UserModel=require('../../models/Users');
var AuthorizationController=('../../controllers/AuthorizationController.js');


var StoreItemController={
    getStoreItemOrg:function(req,res,callback){
        StoreItemModel.getStoresOfOrg(req.storeid,callback);
    },
    getStoreTeam:function(req,res,callback){
        StoreItemModel.getStoresOfTeam(req.storeid,callback);
    },
    buyItemUser:function(req,res,callback){
      var cost=StoreItemModel.getStoreItemCost(req.id);
        UserModel.buyItemToUser(req.id,req.storedata,cost,callback);
    }


};