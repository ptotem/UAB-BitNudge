var ProductModel=require('../models/Products');
var AuthorizationController=('./AuthorizationController.js');
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
     },
    removeProduct:function(req,res,callback){
        ProductModel.deleteProduct(req.productId,callback);
    },
    getProduct:function(req,res,callback){
        ProductModel.getProduct(req.productId,callback);
    },
    updateProducts:function(req,res,callback){
        ProductModel.updateProduct(req.data);
    }
};
module.exports=ProductController;