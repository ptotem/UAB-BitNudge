var ClientsCollection=require('./ClientsCollection.js');
var mongoose=require('mongoose');

var Client= {
    getClientSchema:function(){
        return ClientsCollection.Schema;
    },
    createClient:function(orgId,data){
      data.orgId=mongoose.Types.ObjectId(orgId);
        data.createdAt=new Date();
        var client=new ClientsCollection(data);
        client.save();
        return true;
    },
    deleteClient:function(id,callback){
        ClientsCollection.remove({'_id':id},callback);
    },
    getClientByOrg:function(orgid,callback){
        ClientsCollection.find(({organizationId :orgid}),callback);
    },
    updateClient:function(id,updateData,callback){
        ClientsCollection.update({_id:id},{$set:updateData},callback);
    },
    getClient:function(id,fields,options,populationData,callback){
        ClientsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
    },
    getClientOfOrg:function(orgId,fields,options,populationParams,callback){
        ClientsCollection.find({organizationId:orgId},fields,options).populate(populationParams).exec(callback);
    }
};
module.exports=Client;
