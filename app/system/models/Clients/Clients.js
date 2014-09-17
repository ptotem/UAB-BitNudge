var ClientsCollection=require('./ClientsCollection.js');
var Schema=mongoose.Schema;
var Client= {
    initialize: function (server) {
        console.log("Clients initialized");
    },
    getClientDetail:function(client,fieldName, callback){
        ClientsCollection.find( { fieldName: { $exists: true} } )
        ClientsCollection.find(({'_id' :client}).fieldName,callback);
    },
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
    getClient:function(id,callback){
        ClientsCollection.findOne({_id:id},callback);
    },
    getClientByOrg:function(orgId,callback){
        ClientsCollection.find(({orgId :orgId}),callback);
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
