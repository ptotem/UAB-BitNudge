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
    }
};
module.exports=ClientController;