// var ProductsCollection=require('./ProductsCollection.js');
//
// var Product= {
// <<<<<<< HEAD
//     getProductDetail:function(product_id,fieldName,callback){
//         ProductsCollection.find(({'_id' :product_id}).fieldName,callback);
// =======
//     initialize: function (server) {
//         console.log("Product initialized");
//     },
//     getProductDetail:function(productId,fields,options,populationData,callback){
//         ProductsCollection.find(({'_id' :productId}),fields,options).populate(populationData).exec(callback);
// >>>>>>> FETCH_HEAD
//     },
//     getProductSchema:function(){
//         return ProductsCollection.Schema;
//     },
//     createProduct:function(data){
//         var product=new ProductsCollection(data);
//         product.created_at=new Date();
//         product.save();
//         return true;
//     },
//     deleteProduct:function(id,callback){
//         ProductsCollection.remove({'_id':id},callback);
//     },
//     getProduct:function(id,fields,options,populationData,callback){
//         ProductsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
//     },
//     getProductByOrgId:function(orgId,fields,options,populationData,callback){
//         ProductsCollection.find(({orgId :orgId}),fields,options).populate(populationData).exec(callback);
//     },
//     updateProduct:function(id,updateData,callback){
//         ProductsCollection.update({_id:id},{$set:updateData},callback);
//     },
//     addProductInOrg:function(orgId,data){
//         var product=new ProductsCollection({data:data,orgId :orgId});
//         product.save();
// <<<<<<< HEAD
//         console.log('data Saved');
// =======
//         console.log('Data Saved')
// >>>>>>> FETCH_HEAD
//         return true;
//     },
//     sellProductToClient:function(product_id,client_id,calback){
//         ProductsCollection.update(({_id: product_id}, {$push: {client: client_id}}, callback));
//     }
// };
// module.exports=Product;
