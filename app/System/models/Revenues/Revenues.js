var RevenuesCollection=require('./ClientsCollection.js');

var Revenue= {

    getRevenueDetail:function(revenue_id,fieldName){
        RevenuesCollection.find(({'_id' :revenue_id}).fieldName,callback);
    },
    getRevenueSchema:function(){
        return RevenuesCollection.Schema;
    },
    createRevenue:function(data){
        var revenue=new RevenuesCollection(data);
        revenue.created_at=new Date();
        revenue.save();
        return true;
    },
    deleteRevenue:function(id,callback){
        RevenuesCollection.remove({'_id':id},callback);
    },
    getRevenue:function(id,callback){
        RevenuesCollection.findOne({_id:id},callback);
    },
    getRevenueByOrgId:function(orgid,callback){
        RevenuesCollection.find(({organizationId :orgid}),callback);
    },
    updateRevenue:function(id,fieldName,value,callback){
        var temp={};
        temp[fieldName]=value;
        RevenuesCollection.update({_id:id},{$set:temp},callback);
    }
}
module.exports=Revenue;


//Inside organizations add revenue