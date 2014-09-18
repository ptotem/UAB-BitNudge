var RevenuesCollection=require('./RevenuesCollection.js');

var Revenue= {

    getRevenueDetail:function(revenue_id,fieldName,callback){
        RevenuesCollection.find(({'_id' :revenue_id}).fieldName,callback);
    },
    getRevenueSchema:function(){
        return RevenuesCollection.Schema;
    },
    createRevenue:function(data){
        data.crewatedAt=new Date();
        var revenue=new RevenuesCollection(data);
//        revenue.created_at=new Date();
        revenue.save();
        return true;
    },
    deleteRevenue:function(id,callback){
        RevenuesCollection.remove({'_id':id},callback);
    },
    getRevenue:function(id,callback){
        RevenuesCollection.findOne({_id:id},callback);
    },
    getRevenuesOfUserId:function(userId,callback){
      RevenuesCollection.find({user:userId},fields,options,callback);
    },
    getRevenueByOrgId:function(orgid,callback){
        RevenuesCollection.find(({organizationId :orgid}),callback);
    },
    updateRevenue:function(id,updateData,callback){
        RevenuesCollection.update({_id:id},{$set:updateData},callback);
    }
};
module.exports=Revenue;
