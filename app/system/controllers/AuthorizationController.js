var RoleModel=require('../models/Roles');
var UserModel=require('../models/Users');

var AuthorizationController={
    IsAuthorized:function(userId,model,operation,callback){
        UserModel.findOne({_id:userId}) .populate('roles').exec(function (err, roles) {
                if (err) return handleError(err);
                 var capability=roles.capabilities;
                 capability.forEach(function(model){
                 var modelData=model.model;
                 var permission=model.permission;
                 if(modelData==model) {
                    if(permission.operation===true){
                       return true;
                    }
                    else{
                        return false;
                    }
                }
    });
});
    }
};
module.exports=AuthorizationController;
