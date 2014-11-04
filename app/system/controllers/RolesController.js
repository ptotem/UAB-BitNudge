var RolesModel=require('../models/Roles');

var RolesController={
  getRolesOfOrganization:function(req,res){
    RolesModel.getRolesFromQuery({},"-capabilities","","",function(err,obj){
      res.send(obj);
    });
  }
};
module.exports=RolesController;
