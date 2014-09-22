var StoreModel=require('../../models/Store');
var TeamModel=require('../../models/Teams');
// var AuthorizationController=('../../controllers/AuthorizationController.js');

var StoreController={
    getStoresOfOrganization:function(req,res){
        // if(AuthorizationController.IsAuthorized(req.userId,Store,read)) {
            StoreModel.getStoresOfOrganization(req.params.orgId,"","","",function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
        // }
    },
    getStore:function(req,res){
      StoreModel.getStore(req.params.storeId,"",{},"",function(err,obj){
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
    //         StoreModel.addItemToStore(req.params.storeId, req.body.item,function(err,obj){
    //           if(err) res.send(err);
    //           else res.send(obj);
    //         });
    //     // }
    // },
    assignStoreItemToStore:function(req,res){
      StoreModel.addItemToStore(req.params.storeId,req.body.item,function(err,obj){
        if(err) res.send("fail");
        else res.send("success");
      });
    },
    createStore:function(req,res){
        // if(AuthorizationController.IsAuthorized(req.userId,Storeitem,write)) {
            StoreModel.createStore(req.params.orgId, req.body,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
        // }
    },
    addStoreInTeam:function(req,res) {
        // if (AuthorizationController.IsAuthorized(req.userId, Store, write)) {
            TeamModel.addStoresToT54191265d185bc0000884dfbeam(req.params.teamId, req.body.store,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
        // }
    },
    removeStoreFromTeam:function(req,res){
        TeamModel.removeStoresFromTeam(req.params.teamId,req.body.store,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
    },
    deleteStore:function(req,res){
      StoreModel.deleteStore(req.params.storeId,function(err){
        TeamModel.removeStoresFromAllTeams(req.body.store,function(err1,obj){
          if(err) res.send(err+" ");
          else res.send("success");
        });
      });
    },
    updateStore:function(req,res){
      StoreModel.updateStore(req.params.storeId,req.body,function(err,obj){
        if(err) res.send("fail");
        else res.send("success");
      });
    }
};
module.exports=StoreController;

