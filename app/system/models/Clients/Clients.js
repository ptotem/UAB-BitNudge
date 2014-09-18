var ClientsCollection=require('./ClientsCollection.js');
var mongoose=require('mongoose');
var Client= {
    initialize: function (server) {
        console.log("Clients initialized");
    },
    // getClientDetail:function(client,fieldName, callback){
    //     ClientsCollection.find(({'_id' :client}).fieldName,callback);
    // },
    getClientSchema:function(){
        return ClientsCollection.Schema;
    },
    createClient:function(orgId, data){
        data.createdAt=new Date();
        data.orgId=mongoose.Types.ObjectId(orgId);
        var l=new ClientsCollection(data);
        l.save();
        return true;
    },
    deleteClient:function(id,callback){
        ClientsCollection.remove({'_id':id},callback);
    },
    getClient:function(id,fields,options,populationData,callback){
        ClientsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
    },
    getClientByOrg:function(orgId,fields,options,populationData,callback){
        ClientsCollection.find(({orgId :orgId}),fields,options).populate(populationData).exec(callback);
    },
    updateClient:function(id,updateData,callback){
        ClientsCollection.update({_id:id},{$set:updateData},callback);
    },
    AddClientInOrg:function(orgId,data,callback){
        ClientsCollection.update({orgId:orgId},{$set:data},callback)
    },
//    AddClientInOrg:function(data,org_id){
//        var client=new ClientsCollection({data:data,organizationId :org_id});
//        client.save();
//        console.log('data Saved')
//        return true;
//    },
    AddClientInOrg:function(orgId,data){
        var client=new ClientsCollection(data);
        client.orgId=mongoose.Types.ObjectId(orgId);
        client.save();
        console.log('data Saved')
        return true;
    }

}
module.exports=Client;
//Add Client in Organizations:
