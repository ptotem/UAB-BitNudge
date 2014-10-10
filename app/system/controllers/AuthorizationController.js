var RoleModel=require('../models/Roles');
var RolesCollection=require('../models/Roles/RolesCollection.js');
var UserModel=require('../models/Users');
var CapabilitiesModel=require('../models/Capabilities');

var AuthorizationController={
  isAuthorized:function(model,method,req,res,next){
    RolesCollection.aggregate([{$match:{/* _id:req.user.roles */}},{$unwind:'$capabilities'},{$match:{'capabilities.model':model}},{$unwind:'$capabilities.capabilities'},{$match:{'capabilities.capabilities.method':method}},{$group:{_id:"$_id",capability:{$last:"$capabilities.capabilities.capability"}}}],function(err,capabilityObj){
      // return next();
      if(!capabilityObj.length>0)
        return res.send(401,{status:"You are not authorized for this request"});
      else{
        CapabilitiesModel.getCapability(capabilityObj[0].capability,"","","",function(err,capability){
          eval('var isAuthorized='+capability.isAuthorized);
          //temporary for checking. But otherwise req.user must be passed, from bearer strategy.
          var temp={_id:req.params.userId,orgId:req.params.orgId};
          isAuthorized(temp/* req.user */,req.params,function(result){
            console.log("result= "+result);
            if(result)
              return next();
            else
              return res.send(401,{status:"You are not authorized for this request"});
          });
        });
      }
    });
  }
};
module.exports=AuthorizationController;
