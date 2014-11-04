var CapabilitiesCollection=require('./CapabilitiesCollection.js');
var mongoose=require('mongoose');
var Capabilities= {
    // createCapability:function(orgId,data,callback){
    //     var capability=new CapabilitiesCollection(data);
    //     capability.orgId=mongoose.Types.ObjectId(orgId);
    //     capability.createdAt=new Date();
    //     capability.save(callback);
    // },
    // deleteCapability:function(id,callback){
    //     CapabilitiesCollection.remove({'_id':id},callback);
    // },
    getCapability:function(id,fields,options,populationData,callback){
        CapabilitiesCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
    }
    // updateCapability:function(id,updateData,callback){
    //     CapabilitiesCollection.update({_id:id},{$set:updateData},callback);
    // },
};
module.exports=Capabilities;
