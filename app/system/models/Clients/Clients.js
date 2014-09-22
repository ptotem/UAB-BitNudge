// var ClientsCollection=require('./ClientsCollection.js');
// var mongoose=require('mongoose');
// <<<<<<< HEAD
//
// var Client= {
//     getClientSchema:function(){
//         return ClientsCollection.Schema;
//     },
//     createClient:function(orgId,data){
//       data.orgId=mongoose.Types.ObjectId(orgId);
//         data.createdAt=new Date();
//         var client=new ClientsCollection(data);
//         client.save();
// =======
// var Client= {
//     initialize: function (server) {
//         console.log("Clients initialized");
//     },
//     // getClientDetail:function(client,fieldName, callback){
//     //     ClientsCollection.find(({'_id' :client}).fieldName,callback);
//     // },
//     getClientSchema:function(){
//         return ClientsCollection.Schema;
//     },
//     createClient:function(orgId, data){
//         data.createdAt=new Date();
//         data.orgId=mongoose.Types.ObjectId(orgId);
//         var l=new ClientsCollection(data);
//         l.save();
// >>>>>>> FETCH_HEAD
//         return true;
//     },
//     deleteClient:function(id,callback){
//         ClientsCollection.remove({'_id':id},callback);
//     },
// <<<<<<< HEAD
//     getClientByOrg:function(orgid,callback){
//         ClientsCollection.find(({organizationId :orgid}),callback);
// =======
//     getClient:function(id,fields,options,populationData,callback){
//         ClientsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
//     },
//     getClientByOrg:function(orgId,fields,options,populationData,callback){
//         ClientsCollection.find(({orgId :orgId}),fields,options).populate(populationData).exec(callback);
// >>>>>>> FETCH_HEAD
//     },
//     updateClient:function(id,updateData,callback){
//         ClientsCollection.update({_id:id},{$set:updateData},callback);
//     },
// <<<<<<< HEAD
//     getClient:function(id,fields,options,populationData,callback){
//         ClientsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
//     },
//     getClientOfOrg:function(orgId,fields,options,populationParams,callback){
//         ClientsCollection.find({organizationId:orgId},fields,options).populate(populationParams).exec(callback);
// =======
//     AddClientInOrg:function(orgId,data,callback){
//         ClientsCollection.update({orgId:orgId},{$set:data},callback)
//     },
// //    AddClientInOrg:function(data,org_id){
// //        var client=new ClientsCollection({data:data,organizationId :org_id});
// //        client.save();
// //        console.log('data Saved')
// //        return true;
// //    },
//     AddClientInOrg:function(orgId,data){
//         var client=new ClientsCollection(data);
//         client.orgId=mongoose.Types.ObjectId(orgId);
//         client.save();
//         console.log('data Saved')
//         return true;
// >>>>>>> FETCH_HEAD
//     }
// };
// module.exports=Client;
