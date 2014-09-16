var StoreModel=require('../../models/Store');
var TeamModel=require('../../models/Store');
var AuthorizationController=('../../controllers/AuthorizationController.js');

var StoreController={
    getStoreOrg:function(req,res,callback){
        if(AuthorizationController.IsAuthorized(req.userId,Store,read,callback)) {
            StoreModel.getStoresOfOrg(req.id, callback);
        }
    },
    getStoreTeam:function(req,res,callback){
        if(AuthorizationController.IsAuthorized(req.userId,Store,read,callback)) {
            StoreModel.getStoresOfTeam(req.id, callback);
        }
    },
    addStoreItemInStore:function(req,res,callback){
        if(AuthorizationController.IsAuthorized(req.userId,Storeitem,write,callback)) {
            StoreModel.addItemToStore(req.storeid, req.itemsData, callback)

        }


    },
    addStoreInOrg:function(req,res,callback){
        if(AuthorizationController.IsAuthorized(req.userId,Storeitem,write,callback)) {
            StoreModel.createStore(req.orgId, req.data, callback);
        }
    },
    addStoreInTeam:function(req,res,callback) {
        if (AuthorizationController.IsAuthorized(req.userId, Store, write, callback)) {
            TeamModel.addStoresToTeam(req.teamId, req.data, callback);
        }
    },
    removeStoreFromTeam:function(req,res,callback){
        TeamModel.removeStoresToTeam(req.teamId,req.stores,callback)

    },
    getStore:function(req,res,callback){
        if(AuthorizationController.IsAuthorized(req.userId,Store,read,callback)) {
            StoreModel.getStore(req.id, callback);
        }
    },
    updateStoreInTeam:function(req,res,callback){
        StoreModel.updateStore()
    },
    updateStoreInOrg:function(req,res,callback){
        StoreModel.updateStore()
    }
//    updateStore


};
module.exports=StoreController;

