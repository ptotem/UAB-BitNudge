// var RevenuesCollection=require('./RevenuesCollection.js');
// var mongoose=require('mongoose');
// var Revenue= {
//
//     //getRevenueDetail:function(revenueId,fields,options,populationData,callback){
//     //    RevenuesCollection.find(({'_id' :revenueId}),fields,options).populate(populationData).exec(callback);
//     //},
//     getRevenueSchema:function(){
//         return RevenuesCollection.Schema;
//     },
// <<<<<<< HEAD
//     createRevenue:function(data){
//         data.crewatedAt=new Date();
//         var revenue=new RevenuesCollection(data);
// //        revenue.created_at=new Date();
// =======
//     createRevenue:function(orgId,data){
//         var revenue=new RevenuesCollection(data);
//         revenue.orgId=mongoose.Types.ObjectId(orgId);
//         revenue.createdAt=new Date();
// >>>>>>> FETCH_HEAD
//         revenue.save();
//         return true;
//     },
//     deleteRevenue:function(id,callback){
//         RevenuesCollection.remove({'_id':id},callback);
//     },
//     getRevenue:function(id,fields,options,populationData,callback){
//         RevenuesCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
//     },
// <<<<<<< HEAD
//     getRevenuesOfUserId:function(userId,callback){
//       RevenuesCollection.find({user:userId},fields,options,callback);
//     },
//     getRevenueByOrgId:function(orgid,callback){
//         RevenuesCollection.find(({organizationId :orgid}),callback);
// =======
//     getRevenueByOrgId:function(orgid,fields,options,populationData,callback){
//         RevenuesCollection.find(({orgId :orgid}),callback);
// >>>>>>> FETCH_HEAD
//     },
//     updateRevenue:function(id,updateData,callback){
//         RevenuesCollection.update({_id:id},{$set:updateData},callback);
//     }
// };
// module.exports=Revenue;
