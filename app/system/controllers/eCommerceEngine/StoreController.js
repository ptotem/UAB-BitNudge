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
    }



};
module.exports=StoreController;

