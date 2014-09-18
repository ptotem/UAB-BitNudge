var RevenuesCollection=require('./RevenuesCollection.js');
var mongoose=require('mongoose');
var Revenue= {

    //getRevenueDetail:function(revenueId,fields,options,populationData,callback){
    //    RevenuesCollection.find(({'_id' :revenueId}),fields,options).populate(populationData).exec(callback);
    //},
    getRevenueSchema:function(){
        return RevenuesCollection.Schema;
    },
    createRevenue:function(orgId,data){
        var revenue=new RevenuesCollection(data);
        revenue.orgId=mongoose.Types.ObjectId(orgId);
        revenue.createdAt=new Date();
        revenue.save();
        return true;
    },
    deleteRevenue:function(id,callback){
        RevenuesCollection.remove({'_id':id},callback);
    },
    getRevenue:function(id,fields,options,populationData,callback){
        RevenuesCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
    },
    getRevenueByOrgId:function(orgid,fields,options,populationData,callback){
        RevenuesCollection.find(({orgId :orgid}),callback);
    },
    updateRevenue:function(id,updateData,callback){
        RevenuesCollection.update({_id:id},{$set:updateData},callback);
    }
}
module.exports=Revenue;


//Inside organizations add revenue