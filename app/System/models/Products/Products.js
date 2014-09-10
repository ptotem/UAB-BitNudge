var ProductsCollection=require('./ProductsCollection.js');

var Product= {
    initialize: function (server) {
        console.log("Product initialized");
    },
    getProductDetail:function(product_id,fieldName){
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
    updateProduct:function(id,fieldName,value,callback){
        var temp={};
        temp.created_at=new Date();
        temp[fieldName]=value;
        ProductsCollection.update({_id:id},{$set:temp},callback);
    },
    addProductInOrg:function(data,org_id){
        var product=new ProductsCollection({data:data,organizationId :org_id});
        product.save();
        console.log('data Saved')
        return true;
    }
}
module.exports=Product;