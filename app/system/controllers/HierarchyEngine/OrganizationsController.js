var OrganizationsModel=require('../../models/Organizations');
// var TeamModel=require('../../models/Teams');
var SocialFeedModel=require('../../models/SocialFeed');
var AuthorizationController=('../../controllers/AuthorizationController.js');
var OrganizationsController={
  createOrganization:function(req,res){
    OrganizationsModel.createOrganization(req.body,function(err,obj){
      if(err) return handleError(err);
      else res.send(obj);
      SocialFeedModel.createSocialFeed(obj._id,{},function(){});
    });
  },
  updateOrganization:function(req,res){
    OrganizationsModel.updateOrganization(req.params.orgId,req.body,function(err){
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
