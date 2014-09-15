var ProductModel=require('../../models/Products');
var AuthorizationController=('../../controllers/AuthorizationController.js');
var ProductController={
     addProductToOrg:function(req,res,callback){
         if(AuthorizationController.IsAuthorized(req.userId,Product,write,callback)) {
             ProductModel.addProductInOrg(req.data, req.orgId, callback);
         }
     },
     sellProductToClient:function(req,res,callback){

        ProductModel.sellProductToClient(req.productId,req.clientId,callback);
    },
     getProductFromOrg:function(req,res,callback) {
         if (AuthorizationController.IsAuthorized(req.userId, Product, read, callback)) {
             ProductModel.getProductByOrgId(req.id, callback);
         }
     }
};
module.exports=ProductController;
