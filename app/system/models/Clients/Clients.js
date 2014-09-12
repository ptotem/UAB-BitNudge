var ClientsCollection=require('./ClientsCollection.js');

var Client= {
    getClientDetail:function(client,fieldName){
        ClientsCollection.find( { fieldName: { $exists: true} } )
        ClientsCollection.find(({'_id' :client}).fieldName,callback);
    },
    getClientSchema:function(){
        return ClientsCollection.Schema;
    },
    createClient:function(data){
        var client=new ClientsCollection(data);
        client.createdAt=new Date();
        client.save();
        return true;
    },
    deleteClient:function(id,callback){
        ClientsCollection.remove({'_id':id},callback);
    },
    getClient:function(id,callback){
        ClientsCollection.findOne({_id:id},callback);
    },
    getClientByOrg:function(orgid,callback){
        ClientsCollection.find(({organizationId :orgid}),callback);
    },
    updateClient:function(id,fieldName,value,callback){
        var temp={};
        temp.created_at=new Date();
        temp[fieldName]=value;
        ClientsCollection.update({_id:id},{$set:temp},callback);
    },
    AddClientInOrg:function(org_id,data,callback){
        ClientsCollection.update({organizationId:org_id},{$set:data},callback)
    },
//    AddClientInOrg:function(data,org_id){
//        var client=new ClientsCollection({data:data,organizationId :org_id});
//        client.save();
//        console.log('data Saved')
//        return true;
//    },
    AddClientInOrg:function(data,org_id){
        var client=new ClientsCollection(data);
        client.organizationId=org_id;
        client.save();
        console.log('data Saved')
        return true;
    },
    getClient:function(id,fields,options,populationData,callback){
        ClientsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
    }

}
module.exports=Client;
