var OrganizationsModel=require('../../models/Organizations');
// var TeamModel=require('../../models/Teams');
var AuthorizationController=('../../controllers/AuthorizationController.js');
var OrganizationsController={
  addOrganization:function(req,res){
    OrganizationsModel.createOrganization(req.query,function(err,obj){
      if(err) return handleError(err);
      else res.send(obj);
    });
  },
  updateOrganization:function(req,res){
    TeamModel.updateTeam(req.params.orgId,req.query,function(err){
      if(err) return handleError(err);
      else res.send("yay");
    });
  },
  getOrganization:function(req,res){
    OrganizationsModel.getOrganization(req.params.orgId,{_id:0},function(err,obj){
      if(err){
        res.send("failed");
        return handleError(err);
      }
      else res.send(obj);
    });
  }
};
module.exports=OrganizationsController;
