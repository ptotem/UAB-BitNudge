var OrganizationModel=require('../../System/models/Organizations');
var ClientModel=require('../../System/models/Clients');
var ClientController= {
    initialize: function (server) {

        console.log("Client initialized");
    },

    isAuthorised: function(id,model,action,callback){
        ClientModel.getClient(id,callback);
    },
    isRightField: function(id,feild_name){
        ClientModel.getClientDetail(id,feild_name);
    },
    isClientValidate: function(id,callback){
        ClientModel.getClientSchema();

    }
}