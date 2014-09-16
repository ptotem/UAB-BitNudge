var ClientModel=require('../../models/clients');
var AuthorizationController=('../../controllers/AuthorizationController.js');
var ClientController={

    addClientsToOrg:function(req,res,callback){
        if(AuthorizationController.IsAuthorized(req.userId,Client,write,callback)) {
            ClientModel.AddClientInOrg(req.id, req.data, callback);
        }
    },

    getClientsFromOrg:function(req,res,callback){
        if(AuthorizationController.IsAuthorized(req.userId,Client,read,callback)) {
            ClientModel.getClientOfOrg(req.id, callback);
        }
    },
    getClientInfo:function(req,res,callback){
        ClientModel.getClient(req.clientId,callback);
    },
    updateClientData:function(req,res,callback){
        ClientModel.updateClient(req,res,callback);
    },
    assignClientToUser:function(req,res,callback){
        ClientModel.assignClientToUser(req.userId,callback)
    }
//    updateClient
};
module.exports=ClientController;