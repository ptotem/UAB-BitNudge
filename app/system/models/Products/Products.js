var ProductsCollection=require('./ProductsCollection.js');

var Product= {
    getProductDetail:function(product_id,fieldName,callback){
        ProductsCollection.find(({'_id' :product_id}).fieldName,callback);
    },
    getProductSchema:function(){
        return ProductsCollection.Schema;
    },
    createProduct:function(data){
        var product=new ProductsCollection(data);
        product.created_at=new Date();
        product.save();
        return true;
    },
    deleteProduct:function(id,callback){
        ProductsCollection.remove({'_id':id},callback);
    },
    getProduct:function(id,callback){
        ProductsCollection.findOne({_id:id},callback);
    },
    getProductByOrgId:function(orgid,callback){
        ProductsCollection.find(({organizationId :orgid}),callback);
    },
    updateProduct:function(id,updateData,callback){
        ProductsCollection.update({_id:id},{$set:updateData},callback);
    },
    addProductInOrg:function(data,org_id){
        var product=new ProductsCollection({data:data,organizationId :org_id});
        product.save();
        console.log('data Saved');
        return true;
    },
    sellProductToClient:function(product_id,client_id,calback){
        ProductsCollection.update(({_id: product_id}, {$push: {client: client_id}}, callback));
    }
};
module.exports=Product;
