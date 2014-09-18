var ProductsCollection=require('./ProductsCollection.js');

var Product= {
    initialize: function (server) {
        console.log("Product initialized");
    },
    getProductDetail:function(productId,fields,options,populationData,callback){
        ProductsCollection.find(({'_id' :productId}),fields,options).populate(populationData).exec(callback);
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
    getProduct:function(id,fields,options,populationData,callback){
        ProductsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
    },
    getProductByOrgId:function(orgId,fields,options,populationData,callback){
        ProductsCollection.find(({orgId :orgId}),fields,options).populate(populationData).exec(callback);
    },
    updateProduct:function(id,updateData,callback){
        ProductsCollection.update({_id:id},{$set:updateData},callback);
    },
    addProductInOrg:function(orgId,data){
        var product=new ProductsCollection({data:data,orgId :orgId});
        product.save();
        console.log('Data Saved')
        return true;
    }
}
module.exports=Product;
