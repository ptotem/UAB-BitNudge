var StoreModel=require('../../models/Store');
var TeamModel=require('../../models/Teams');
// var AuthorizationController=('../../controllers/AuthorizationController.js');

var StoreController={
    getStoreInOrganization:function(req,res){
        // if(AuthorizationController.IsAuthorized(req.userId,Store,read)) {
            StoreModel.getStoresOfOrg(req.parms.orgId,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
        // }
    },
    getStore:function(req,res){
      StoreModel.getStore(req.params.storeId,"",{},null,function(err,obj){
        if(err) res.send(err);
        else res.send(obj);
      });
    },
    getStoresOfTeam:function(req,res){
        // if(AuthorizationController.IsAuthorized(req.userId,Store,read)) {
            StoreModel.getStoresOfTeam(req.params.teamId,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
        // }
    },
    // addStoreItemInStore:function(req,res){
    //     // if(AuthorizationController.IsAuthorized(req.userId,Storeitem,write)) {
    //         StoreModel.addItemToStore(req.params.storeId, req.query.item,function(err,obj){
    //           if(err) res.send(err);
    //           else res.send(obj);
    //         });
    //     // }
    // },
    createStore:function(req,res){
        // if(AuthorizationController.IsAuthorized(req.userId,Storeitem,write)) {
            StoreModel.createStore(req.params.orgId, req.query,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
        // }
    },
    addStoreInTeam:function(req,res) {
        // if (AuthorizationController.IsAuthorized(req.userId, Store, write)) {
            TeamModel.addStoresToT54191265d185bc0000884dfbeam(req.params.teamId, req.query.store,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
        // }
    },
    removeStoreFromTeam:function(req,res){
        TeamModel.removeStoresFromTeam(req.params.teamId,req.query.store,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
    },
    removeStoreFromAllTeams:function(req,res){
        TeamModel.removeStoresFromAllTeams(req.query.store,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
    },
    // removeStoreFromOrganization:function(req,res){
    //
    // },
    updateStore:function(req,res){
      StoreModel.updateStore(req.params.storeId,function(err,obj){
        if(err) res.send(err);
        else res.send(obj);
      });
    }
};
module.exports=StoreController;

