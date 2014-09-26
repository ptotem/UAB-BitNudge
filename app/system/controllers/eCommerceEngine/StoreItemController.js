var StoreItemModel=require('../../models/StoreItem');
var StoreModel=require('../../models/Store');
var UserModel=require('../../models/Users');
var AuthorizationController=('../../controllers/AuthorizationController.js');

var StoreItemController={
    getStoreItemsOfOrganization:function(req,res){
      StoreItemModel.getStoreItemsOfOrganization(req.params.orgId,"",{},"",function(err,obj){
          var storeItemData={};
          storeItemData=obj;
              if(!err) {
                  res.header('Content-type', 'application/jsonp');
                  res.header('Charset', 'utf8');
                  res.send(req.query.callback + '(' + JSON.stringify(storeItemData) + ');');
//         if(err) res.send(err);
              }
        else {
                  res.end('error');
//      res.send(storeItemData);
              }
      });
    },
    getStoreItemsOfUser:function(req,res){
      UserModel.getStoreItemsOfUser(req.params.userId,"",{},function(err,obj){
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
          })
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
